<!DOCTYPE html>
<?php
	require('connect.php');
	
	// Get information entered by the user
	$user = $_POST['username'];
	$pass = $_POST['password'];
	$conf = $_POST['confirm_password'];
	
	if(empty($user))
	{
		// See if this will send the json message
		$error = "Please enter a username";
		$sentError = json_encode($error);
	}
	if(empty($pass))
	{
		exit("Please enter a password");
	}
	if(strcmp($pass, $conf) != 0)
	{
		exit("Passwords do not match");
	}
	
	// Check if there are any rows in the database that have the same userName
	$sqlUserExist = "SELECT * 
					 FROM `users` 
					 WHERE userName = '$user'";
	$result = mysqli_query($connect, $sqlUserExist);
	$numResult = (mysqli_num_rows($result));
		
	if($numResult > 0)
	{
		exit("Username already exists");
	}
	else
	{
		// Insert user into database
		//Adjust for dropdown option
		$sql = "INSERT INTO users (userName, password)
		VALUES
		('$user', '$pass')";
	
		mysqli_query($connect, $sql);
	}
?>