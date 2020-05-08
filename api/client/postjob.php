<?php
    session_start();
	include_once '../config/dbconnect.php';
	
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	$database=new Database();
	$db=$database->getConn();

	$data = json_decode(file_get_contents("php://input"));
	
	$name= $data->name;
	$description=$data->description;
	$budget=$data->budget;
	$category=$data->category;
    $u=$_SESSION['uid'];
    $t=date('Y-m-d H:i:s');
	$query="INSERT into jobs(cid,title,description,budget,status,datetime,category) values($u,'$name','$description',$budget,'open','$t','$category');";
	$exe=pg_query($db,$query);
	
	if($exe)
	{
		
			http_response_code(200);
        	echo json_encode(array("message" => "job was created"));
	}
	else
	{
		http_response_code(400);
        	echo json_encode(array("message" => "job creation error"));
		
	}	
?>
