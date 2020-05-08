<?php
    session_start();
	include_once '../config/dbconnect.php';
	
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	$database=new Database();
	$db=$database->getConn();
    $data = json_decode(file_get_contents("php://input"));
    $jid=$data->jid;
    $u=$_SESSION['uid'];
	$query="select amount from bid where jid=$jid and fid=$u;";
	$exe=pg_query($db,$query);
	
	if($exe)
	{
            if($r=pg_fetch_object($exe))
            {
                http_response_code(200);
                echo json_encode(array("result" => $r));
            }
            else
            {
                http_response_code(400);
        	echo json_encode(array("message" => "error1"));
            }    
	}
	else
	{
		http_response_code(400);
        	echo json_encode(array("message" => $query));
		
	}	
?>
