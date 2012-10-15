package org.toskeiraspace;

import static spark.Spark.*;
import spark.*;
import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;

public class ToskeiraSpace {

    private static String renderHtml(String html) {
        try {
            File file = new File(html);
            return FileUtils.readFileToString(file);
        } catch (IOException e) {
            return "";
        }
    }

    public static void main(String[] args) {

        get(new Route("/") {
            @Override
            public Object handle(Request request, Response response) {
                response.type("text/html");
                return renderHtml("web/index.html");
            }
        });

     }

}
