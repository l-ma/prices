interface MyState {
    message: string;
    formValues: Array<any>;
}

interface FormElements extends HTMLFormControlsCollection {
    // price1: HTMLInputElement
    // num1: HTMLInputElement
    // price2: HTMLInputElement
    // num2: HTMLInputElement
    price: HTMLInputElement
    num: HTMLInputElement
}

interface YourFormElement extends HTMLFormElement {
   readonly elements: FormElements
}

export type { MyState, FormElements, YourFormElement }