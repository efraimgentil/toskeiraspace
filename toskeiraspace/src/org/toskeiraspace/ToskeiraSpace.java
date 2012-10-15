package org.toskeiraspace;

import static spark.Spark.*;
import spark.*;


public class ToskeiraSpace {


    public static void main(String[] args) {

        get(new Route("/ts") {
            @Override
            public Object handle(Request request, Response response) {
                return "Bem vindo ao toskeira space !";
            }
        });

     }

}
