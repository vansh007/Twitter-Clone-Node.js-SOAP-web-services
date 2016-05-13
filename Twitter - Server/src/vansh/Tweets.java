package vansh;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.json.JSONArray;
import org.json.simple.JSONObject;

public class Tweets {

public String getTweets(String email){
	
	String dbUrl = "jdbc:mysql://localhost:3306/twitter";
	System.out.println(email);
	 
	
	JSONObject obj;
	String sr = "";
	try {

	Class.forName("com.mysql.jdbc.Driver");
	Connection con = DriverManager.getConnection (dbUrl, "root", "1234");
	PreparedStatement stmt = con.prepareStatement("select f.*,p.* from posts p   JOIN followers f On p.postEmail = f.email1 where email2=?");
	stmt.setString(1, email);
	ResultSet rs = stmt.executeQuery();
	
	PreparedStatement stmt1 = con.prepareStatement("select f.*,p.* from posts p   JOIN followers f On p.postEmail = f.email2 where email1=?");
	stmt1.setString(1, email);
	ResultSet rs1 = stmt1.executeQuery();
	
	PreparedStatement stmt2 = con.prepareStatement("select p.* from posts p  where postEmail=?");
	stmt2.setString(1, email);
	ResultSet rs2 = stmt2.executeQuery();
	
	
	JSONArray jsonArray = new JSONArray();
	 while (rs.next()) {
         int total_rows = rs.getMetaData().getColumnCount();
         JSONObject obj1 = new JSONObject();
         for (int i = 0; i < total_rows; i++) {
             obj1.put(rs.getMetaData().getColumnLabel(i + 1)
                     .toLowerCase(), rs.getObject(i + 1));
             
         }
         jsonArray.put(obj1);
     }
	 
	 JSONArray jsonArray1 = new JSONArray();
	 while (rs1.next()) {
		 int total_rows = rs1.getMetaData().getColumnCount();
         JSONObject obj2 = new JSONObject();
         for (int i = 1; i <= total_rows; i++) {
             obj2.put(rs1.getMetaData().getColumnLabel(i)
                     .toLowerCase(), rs1.getObject(i));
         }
         jsonArray1.put(obj2);
     }
	 JSONArray jsonArray2 = new JSONArray();
	 while (rs2.next()) {
		 int total_rows = rs2.getMetaData().getColumnCount();
         JSONObject obj3 = new JSONObject();
         for (int i = 1; i <= total_rows; i++) {
             obj3.put(rs2.getMetaData().getColumnLabel(i)
                     .toLowerCase(), rs2.getObject(i));
         }
         jsonArray2.put(obj3);
     }
     
    
	
            obj = new JSONObject();
		    obj.put("statusCode",new Integer(200));
		    obj.put("newsfeed1",jsonArray);
		    obj.put("newsfeed2",jsonArray1);
		    obj.put("newsfeed3",jsonArray2);
		    
		    sr= obj.toString();
		    con.close();
	}
	
	
	catch(ClassNotFoundException e) {
		e.printStackTrace();
	}

	catch(SQLException e) {
		e.printStackTrace();
	}
			return sr;
}


public String postTweet(String email,String desc,String firstName){
	String dbUrl = "jdbc:mysql://localhost:3306/twitter";
	
	JSONObject obj;
	String sr = "";
	try {

	Class.forName("com.mysql.jdbc.Driver");
	Connection con = DriverManager.getConnection (dbUrl, "root", "1234");
	PreparedStatement stmt = con.prepareStatement("insert into posts(postEmail,pDesc,firstName) values(?,?,?)");
	stmt.setString(1, email);
	stmt.setString(2, desc);
	stmt.setString(3, firstName);
	int rs = stmt.executeUpdate();
	
	if(rs==1){
	
		obj = new JSONObject();
	    obj.put("statusCode",new Integer(200));
	   
	    
	    sr= obj.toString();
	    con.close();
	}
	
	
	}
	
	catch(ClassNotFoundException e) {
		e.printStackTrace();
	}

	catch(SQLException e) {
		e.printStackTrace();
	}
	
	
		return sr;
}



}
