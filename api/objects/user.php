<?php
	include_once '../config/dbconnect.php';
	class user 
	{
		public $name;
		public $password;
		public $email;
		public $location;
		public $uid;
		public $type;
	
		public function check()
		{
			$database=new Database();
			$db=$database->getConn();
			if(!$db)
				echo json_encode(array("message"=>"database error"));;
			$query="select * from users where email='$this->email';";
			$exe=pg_query($db,$query);
			if($row=pg_fetch_assoc($exe))
			{
				
				if($row['password']===$this->password)
				{
					$this->uid=$row['uid'];
					$this->location=$row['location'];
					$this->name=$row['uname'];
					$query1="select rid from user_in_role where uid=$this->uid;";
					$exe1=pg_query($db,$query1);
					$row1=pg_fetch_assoc($exe1);
					$this->type=$row1['rid'];
					return true;
				}
			}
			else
			{
				return false;
			}
		} 
	}
	
?>
