import React from 'react';
import './App.css'; // import the css file to enable your styles.
import { MyState, FormElements, YourFormElement } from './mystate';

/**
 * Define the type of the props field for a React component
 */
interface Props { }

/**
 * Using generics to specify the type of props and state.
 * props and state is a special field in a React component.
 * React will keep track of the value of props and state.
 * Any time there's a change to their values, React will
 * automatically update (not fully re-render) the HTML needed.
 * 
 * props and state are similar in the sense that they manage
 * the data of this component. A change to their values will
 * cause the view (HTML) to change accordingly.
 * 
 * Usually, props is passed and changed by the parent component;
 * state is the internal value of the component and managed by
 * the component itself.
 */
class App extends React.Component<Props, MyState> {
  private initialized: boolean = false;

  /**
   * @param props has type Props
   */
  constructor(props: Props) {
    super(props)
    /**
     * state has type GameState as specified in the class inheritance.
     */
    // this.state = { message: "" }
    this.state = {
        message: "", formValues: [{ name: "", price: "", num: "" }]
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  /**
   * Use arrow function, i.e., () => {} to create an async function,
   * otherwise, 'this' would become undefined in runtime. This is
   * just an issue of Javascript.
   */
  newGame = async () => {
    const response = await fetch('/newgame');
    const json = await response.json();
    this.setState({ message: json['message'] });
  }

  stop = async () => {
    const response = await fetch('/stop');
  }

  /**
   * play will generate an anonymous function that the component
   * can bind with.
   * @param price1
   * @param num1
   * @returns
   */
//   calculate = async (event: React.FormEventHandler<HTMLFormElement>) => {
//       // prevent the default behavior on clicking a link; otherwise, it will jump to a new page.
//     //   e.preventDefault();
//       const response = await fetch(`/?price1=${event.currentTarget.price1.value}&num1=${event.num1}`);
//       const json = await response.json();
//       this.setState({ message: json['message'] });
//   }

  handleFormSubmit = async (e: React.FormEvent<YourFormElement>) => {
    e.preventDefault();
    // console.log(e.currentTarget.elements.price1.value);
    // alert(JSON.stringify(this.state.formValues));
    const vals = JSON.stringify(this.state.formValues);
    const toFetch = `/calculate?values=${vals}`
    // const response = await fetch(`/calculate?price1=${e.currentTarget.price.value}&num1=${e.currentTarget.num.value}`);
    const response = await fetch(toFetch);
    // const response = await fetch(`/calculate?price1=${e.currentTarget.price1.value}&num1=${e.currentTarget.num1.value}&price2=${e.currentTarget.price2.value}&num2=${e.currentTarget.num2.value}`);
    console.log(response);
    const json = await response.json();
    this.setState({ message: json['message'] });
  }

//   calculate(event: React.FormEventHandler<HTMLFormElement>): React.FormEventHandler<HTMLFormElement> {
//     return async (e) => {
//       // prevent the default behavior on clicking a link; otherwise, it will jump to a new page.
//       e.preventDefault();
//       const response = await fetch(`/?price1=${event.price1}&num1=${event.num1}`);
//       const json = await response.json();
//       this.setState({ message: json['message'] });
//     }
//   }

//   foo(price1: string, num1: string): React.FormEventHandler<HTMLFormElement> {
//     return async(e) => {
//         "hello";
//     }
//   }

  /**
   * This function will call after the HTML is rendered.
   * We update the initial state by creating a new game.
   * @see https://reactjs.org/docs/react-component.html#componentdidmount
   */
  componentDidMount(): void {
    /**
     * setState in DidMount() will cause it to render twice which may cause
     * this function to be invoked twice. Use initialized to avoid that.
     */
    if (!this.initialized) {
    //   this.newGame();
      this.initialized = true;
    }
  }

  addFormFields() {
    this.setState(({
      formValues: [...this.state.formValues, { name: "", price: "", num: "" }]
    }))
  }

  removeFormFields(i: number) {
    let formValues = this.state.formValues;
    formValues.splice(i, 1);
    this.setState({ formValues });
  }

  handleChange(i: number, e: React.ChangeEvent<HTMLInputElement>) {
    let formValues = this.state.formValues;
    (formValues[i] as any)[e.target.name] = e.target.value;
    this.setState({ formValues });
  }

  /**
   * The only method you must define in a React.Component subclass.
   * @returns the React element via JSX.
   * @see https://reactjs.org/docs/react-component.html
   */
  render(): React.ReactNode {
    /**
     * We use JSX to define the template. An advantage of JSX is that you
     * can treat HTML elements as code.
     * @see https://reactjs.org/docs/introducing-jsx.html
     */
    return (
        <form  onSubmit={this.handleFormSubmit}>
          {this.state.formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              <label>Item Name</label>
              <input type="text" name="name" value={element.name || ""} onChange={e => this.handleChange(index, e)} />
              <label>Price</label>
              <input type="text" name="price" value={element.price || ""} onChange={e => this.handleChange(index, e)} />
              <label>Number</label>
              <input type="text" name="num" value={element.num || ""} onChange={e => this.handleChange(index, e)} />
              {
                index ? 
                  <button type="button"  className="button remove" onClick={() => this.removeFormFields(index)}>Remove</button> 
                : null
              }
            </div>
          ))}
          <div className="button-section">
              <button className="button add" type="button" onClick={() => this.addFormFields()}>Add</button>
              <button className="button submit" type="submit">Submit</button>
          </div>
        </form>
    );
  }
}

/*
return (
        <body>
            <div>
                <b>Big Cents:</b>
            </div>
            <form onSubmit={this.handleFormSubmit}>
                <label>
                    Price:
                    <input type="text" name="price1" />
                    <br></br>
                    Number:
                    <input type="text" name="num1" />
                </label>
                <input type="submit" value="Calculate"/>
            </form>
            <div>{this.state.message}</div>
        </body>
    );
*/

/*
<form onSubmit={this.handleFormSubmit}>
            <div>
                <label htmlFor="price1">First item:</label>
                <input id="price1" type="text" />
                <label htmlFor="num1">Quantity:</label>
                <input id="num1" type="text" />
                <br></br>
                <label htmlFor="price2">Second item:</label>
                <input id="price2" type="text" />
                <label htmlFor="num2">Quantity:</label>
                <input id="num2" type="text" />
            </div>
                <button type="submit">Calculate</button>
            </form>
            <div>{this.state.message}</div>
             */

export default App;

{/* <form onSubmit={this.handleFormSubmit}>
                <label>
                    Price:
                    <input type="text" name="price1" />
                    <br></br>
                    Number:
                    <input type="text" name="num1" />
                </label>
                <input type="submit" value="Calculate"/>
            </form>
            <div>{this.state.message}</div> */}