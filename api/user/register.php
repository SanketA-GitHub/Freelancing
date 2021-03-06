<?php
	include_once '../config/dbconnect.php';
	if($_SERVER['REQUEST_METHOD']=="OPTIONS")
	{
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
		header('Access-Control-Allow-Headers: CONTENT-TYPE');
	}
	else {
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	$database=new Database();
	$db=$database->getConn();

	$data = json_decode(file_get_contents("php://input"));
	
	$name= $data->name;
	$email=$data->email;
	$password=$data->password;
	$location=$data->location;
	$type=$data->type;
	
	$query="INSERT into users(uname,email,password,location) values('$name','$email','$password','$location');";
	$exe=pg_query($db,$query);
	
	if($exe)
	{
		$query2="select uid from users where email='$email';";
		$exe2=pg_query($db,$query2);
		if($row=pg_fetch_assoc($exe2))
		{
			$uid=$row["uid"];
			$query1="INSERT into user_in_role values($uid,$type);";
			$exe1=pg_query($db,$query1);
			$q2="INSERT into rating values($uid,0,0);";
			$exe3=pg_query($db,$q2);
		}
		if($exe1&&$exe3)
		{
			http_response_code(200);
        		echo json_encode(array("message" => "user was created"));
		}
	}
	else
	{
		http_response_code(400);
        	echo json_encode(array("message" => "User creation error"));
		
	}
	}	
?>
