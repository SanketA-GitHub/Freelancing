<?php
	include '../config/core.php';
	include '../libs/php-jwt-master/src/BeforeValidException.php';
	include '../libs/php-jwt-master/src/ExpiredException.php';
	include '../libs/php-jwt-master/src/SignatureInvalidException.php';
	include '../libs/php-jwt-master/src/JWT.php';
	use \Firebase\JWT\JWT;
	class Validate
	{
		public $jwt;
		function valid()
		{
			$this->jwt="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzUwMDg3MDMsImV4cCI6MTU3NTAxMDUwMywiZGF0YSI6eyJ1aWQiOiIzIiwibmFtZSI6Im1vbnUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwiZW1haWwiOiJhQGEuY29tIn19.XAk62YAP4ir0cc_ua-zzdDEHG6TeQWUY2DTuAc5jBN8";
			if($this->jwt)
			{
				try
				{
					$decode=JWT::decode($this->jwt,"freelancing",['HS256']);
					return ($decode);
				}
				catch(\Exception $e)
				{
					return ($e);
				}
			}
		}
	}
	$a=new Validate();
	$b=$a->valid();
	print_r($b);
?>
