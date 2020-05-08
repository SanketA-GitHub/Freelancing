<?php
	include_once '../config/dbconnect.php';
	
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	$database=new Database();
	$db=$database->getConn();


	$query="SELECT uname,location,rating,cnt,u.uid from users u,user_in_role r,rating rt WHERE u.uid=r.uid and rt.uid=u.uid and rid=2;";
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
