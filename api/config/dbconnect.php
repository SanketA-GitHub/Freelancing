<?php
class Database
{
	private $host="host=localhost";
	private $port="port=5432";
	private $db_name="dbname=freelancer";
	private $credintials="user=himanshu password=12345678";
	public $con;

	public function getConn()
	{
		$this->con=pg_connect("$this->host $this->port $this->db_name $this->credintials");
		if(!$this->con)
		{
			return false;
		}
		return $this->con;
	}
}
?>
