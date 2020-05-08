<?php
	include_once '../objects/user.php';
	include_once '../config/core.php';

	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	
	$data = json_decode(file_get_contents("php://input"));
	
	$usr= new user();	
	$usr->email=$data->email;
	$usr->password=$data->password;
	$chk=$usr->check();
	if($chk)
	{
		session_start();
		$_SESSION["name"]=$usr->name;
		$_SESSION["password"]=$usr->password;
		$_SESSION["uid"]=$usr->uid;
		$_SESSION["location"]=$usr->location;
		$_SESSION["type"]=$usr->type;
		$_SESSION["email"]=$usr->email;
		$_SESSION["etime"]=time()+3600;
		$n=($usr->name);
		$n=rtrim($n);
		//echo $n;
		$cookie_value="$n,$usr->uid,$usr->type";
		setcookie("freelancing",$cookie_value, time() + (86400 * 30), "/");
		http_response_code(200);
		echo json_encode(array("name"=>$usr->name,"uid"=>$usr->uid,"type"=>$usr->type));
	}
	else
	{
		http_response_code(401);
		echo json_encode(array("message"=>"login unsuccessful"));
	}
?>
