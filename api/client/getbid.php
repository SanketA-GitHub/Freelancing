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

	$query="SELECT uname,location,rating,cnt,amount,u.uid,jid from users u,bid b,rating r WHERE jid=$jid and u.uid=b.fid and u.uid=r.uid;";
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
