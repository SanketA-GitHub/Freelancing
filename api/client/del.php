<?php
	include_once '../config/dbconnect.php';
	
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	$database=new Database();
	$db=$database->getConn();
    $data = json_decode(file_get_contents("php://input"));
    $jid=$data->jid;
    $query="delete from bid where jid=$jid;delete from jobs where jid=$jid;";
	$exe=pg_query($db,$query);
	
	if($exe)
	{
		
            http_response_code(200);
            echo json_encode(array("result" => "Success"));
	}
	else
	{
		http_response_code(400);
        	echo json_encode(array("message" => "error"));
		
	}	
?>
