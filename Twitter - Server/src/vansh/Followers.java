package vansh;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.json.JSONArray;
import org.json.simple.JSONObject;

public class Followers {	
	public String getFollowers(String email, String status){
		
		String dbUrl = "jdbc:mysql://localhost:3306/twitter";
		
		JSONObject obj;
		String sr = "";
		try {

		Class.forName("com.mysql.jdbc.Driver");
		Connection con = DriverManager.getConnection (dbUrl, "root", "1234");
		PreparedStatement stmt = con.prepareStatement("select f.* from followers f where email2=? and status=?");
		stmt.setString(1, email);
		stmt.setString(1, status);
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
			    obj.put("followers",jsonArray);
			    
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

		public String getFollowing(String email, String status){
			
			String dbUrl = "jdbc:mysql://localhost:3306/twitter";
			
			JSONObject obj;
			String sr = "";
			try {

			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection (dbUrl, "root", "1234");
			PreparedStatement stmt = con.prepareStatement("select f.* from followers f where email2=? and status = ?");
			stmt.setString(1, email);
			stmt.setString(1, status);
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
				    obj.put("following",jsonArray);
				    
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

	
		public String follow(String uEmail, String fEmail){
	
		String dbUrl = "jdbc:mysql://localhost:3306/twitter";
	
	 
	
		JSONObject obj;
		String sr = "";
		try {

			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection (dbUrl, "root", "1234");
			PreparedStatement stmt = con.prepareStatement("insert into followers values(?,?,?)");
			
			stmt.setString(1, uEmail);
			stmt.setString(2, fEmail);
			stmt.setInt(3, 0);
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
