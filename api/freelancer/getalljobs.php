<?php
	include_once '../config/dbconnect.php';
	
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	$database=new Database();
	$db=$database->getConn();


	$query="SELECT title,description,status,jid from jobs WHERE status in ('open');";
	$exe=pg_query($db,$query);
	
	if($exe)
	{
		
            http_response_code(200);
            //echo($exe);
            $res=array();
            $i=0;
            while($r=pg_fetch_object($exe))
                $res[$i++]=$r;
        	echo json_encode(array("result" => $res));
	}
	else
	{
		http_response_code(400);
        	echo json_encode(array("message" => "error"));
		
	}	
?>
