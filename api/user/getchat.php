<?php
	session_start();
	include_once '../config/dbconnect.php';
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	$database=new Database();
	$db=$database->getConn();

    $data = json_decode(file_get_contents("php://input"));
	
    $j= $data->jid;
    $to=$data->t;
    $u=$_SESSION['uid'];

	$query="select * from chat where id1 in ($u,$to) and id2 in ($u,$to) and jid=$j;";
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
        	echo json_encode(array("message" => $query));
		
	}	
?>
