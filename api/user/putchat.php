<?php
	include_once '../config/dbconnect.php';
	
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
    session_start();
	$database=new Database();
	$db=$database->getConn();

    $data = json_decode(file_get_contents("php://input"));
	
    $j= $data->jid;
    $to=$data->t;
    $u=$_SESSION['uid'];
    $msg=$data->msg;

	$query="insert into chat values($u,$to,$j,'$msg');";
	$exe=pg_query($db,$query);
	
	if($exe)
	{
		
            http_response_code(200);
        	echo json_encode(array("result" => "success"));
	}
	else
	{
		http_response_code(400);
        	echo json_encode(array("message" => "error" ));
		
	}	
?>
