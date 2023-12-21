package com.bigcent;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.json.JSONArray;
import org.json.JSONObject;

import fi.iki.elonen.NanoHTTPD;

public class App extends NanoHTTPD {

    public static void main(String[] args) {
        try {
            new App();
        } catch (IOException ioe) {
            System.err.println("Couldn't start server:\n" + ioe);
        }
    }
    
    private Price pricing;
    public static final int PORT = 8080;

    /**
     * Start the server at :8080 port.
     * @throws IOException
     */
    public App() throws IOException {
        super(PORT);

        this.pricing = new Price();

        start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
        System.out.println("\nRunning!\n");
    }

    @Override
    public Response serve(IHTTPSession session) {
        String uri = session.getUri();
        Map<String, String> params = session.getParms();
        String errormessage = "";
        if (uri.equals("/newgame")) {
        } else if (uri.equals("/calculate")) {
            // e.g., http://localhost:8080/?price=10&num=1
            try {
                // Gson gson = new Gson();
                // Map<String, Map<String, String>> map = gson.<Map<String, Map<String, String>>>fromJson(params, Map.class);
                System.out.println(params);
                System.out.println(params.get("values"));
                JSONArray array = new JSONArray(params.get("values"));
                for(int i = 0; i < array.length(); i++) {
                    JSONObject object = array.getJSONObject(i);
                    System.out.println(object.getString("name"));
                    System.out.println(object.getString("price"));
                    System.out.println(object.getString("num"));
                }
                int price1 = Integer.parseInt(params.get("price1"));
                int num1 = Integer.parseInt(params.get("num1"));
                // int price2 = Integer.parseInt(params.get("price2"));
                // int num2 = Integer.parseInt(params.get("num2"));
                // errormessage = pircing.calculate(price1, num1, price2, num2);
                errormessage = pricing.calculate(price1, num1);
            } catch (RuntimeException e) {
                errormessage = e.getMessage();
            }
        } else if (uri.equals("/stop")) {
            System.out.println("Stopping");
            this.closeAllConnections();
            this.stop();
        }
        // Extract the view-specific data from the game and apply it to the template.
        return newFixedLengthResponse(errormessage);
    }
}
