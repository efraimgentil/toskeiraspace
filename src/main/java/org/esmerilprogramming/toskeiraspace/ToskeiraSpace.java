package org.esmerilprogramming.toskeiraspace;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
    
}
