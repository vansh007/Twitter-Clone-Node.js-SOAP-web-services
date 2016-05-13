package vansh;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.simple.JSONObject;

public class Find {

public String getUsers(String searchTerm){
	
	String dbUrl = "jdbc:mysql://localhost:3306/twitter";
	
	JSONObject obj;
	String sr = "";
	try {

	Class.forName("com.mysql.jdbc.Driver");
	Connection con = DriverManager.getConnection (dbUrl, "root", "1234");
	PreparedStatement stmt = con.prepareStatement("select email,firstName,lastName from users where firstName like ? or lastName like ?");
	stmt.setString(1, "%"+searchTerm+"%");
	stmt.setString(2, "%"+searchTerm+"%");
	ResultSet rs = stmt.executeQuery();
	
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
	        obj = new JSONObject();
		    obj.put("statusCode",new Integer(200));
		    obj.put("userResults",jsonArray);
		    
		    sr= obj.toString();
		    con.close();
	}
	catch(ClassNotFoundException e) {

	}
	catch(SQLException e) {
	}
		return sr;

}

}
