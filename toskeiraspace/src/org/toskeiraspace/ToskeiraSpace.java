package org.toskeiraspace;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.*;
import org.eclipse.jetty.server.handler.*;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.servlet.*;

@SuppressWarnings("serial")
public class ToskeiraSpace extends HttpServlet {

    private static final String SAVE = "1";
    private static final String OTHER = "2";
    private static final String TEST_THE_GET = "3";


    private String showSomething() {
        return "{score:100}";
    }

    private void saveScore() {
        System.out.println("salvar a parada em algum lugar nem que seja um txt");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        if(req.getParameter("o").equals(SAVE)) {
            saveScore();
        } else {
            System.out.println("faz outra coisa sei la");
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        res.setContentType("text/html");
        res.setStatus(HttpServletResponse.SC_OK);
        res.getWriter().println(showSomething());
    }

    public static void main(String[] args) throws Exception {

        Server s = new Server(4567);

        ResourceHandler rh = new ResourceHandler();
        rh.setDirectoriesListed(true);
        rh.setWelcomeFiles(new String[]{"index.html"});
        rh.setResourceBase("web");

        ServletContextHandler sch = new ServletContextHandler(ServletContextHandler.SESSIONS);
        sch.setContextPath("/ts");
        sch.addServlet(new ServletHolder(new ToskeiraSpace()),"/*");

        HandlerList hrs = new HandlerList();
        hrs.setHandlers(new Handler[] { sch, rh, new DefaultHandler() });

        s.setHandler(hrs);
        s.start();
        s.join();
    }
}
