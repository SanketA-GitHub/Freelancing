<?php
	include_once '../config/dbconnect.php';
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	$database=new Database();
	$db=$database->getConn();

    $data = json_decode(file_get_contents("php://input"));
	
    $id= $data->id;
    $rate=$data->rate;
    
	$query="update rating set rating=rating+$rate,cnt=cnt+1 where uid=$id;";
	$exe=pg_query($db,$query);
	
	if($exe)
	{
				echo json_encode(array("result" => "success"));
				http_response_code(200);
	}
	else
	{
		http_response_code(400);
        	echo json_encode(array("message" => $query));
		
	}	
?>
