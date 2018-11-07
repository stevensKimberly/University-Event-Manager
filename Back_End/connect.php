<?php

	$server = 'dbschedule.cm0a6cdoupkr.us-east-1.rds.amazonaws.com';
	$user = 'Ashley';
	$password = 'Sunshine1916';
	$dbName = 'Scheduler';

	$connect = mysqli_connect($server, $user,$password,$dbName) or die("Error: Cannot connect");
?>
