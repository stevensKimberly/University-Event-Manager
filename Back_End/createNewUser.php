<?php
	require_once 'session.php';
	require('connect.php');
	
	// Get information entered by the user
	$user = $_POST['username'];
	$pass = $_POST['password'];
	$conf = $_POST['confirm_password'];
	
	// Check to see if any criteria are missing or mismatched passwords.
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
	
	// Check if there are any rows in the database that have the same userName.
	// Queries are in prepared statments to prevent SQL injection.
	$sqlUserExist = "SELECT * 
					 FROM users
					 WHERE userName = ?";
					 
	$stmt = mysqli_prepare($connect, $sqlUserExist);
	if (!$stmt) 
	{
		// could not compile the query (problem with query)
		exit(mysqli_error($connect));
	}
	
	// Populate the placeholders.
	$stmt->bind_param('s', $user);
	// Execute the query with placeholders populated.
	if (!$stmt->execute()) {
		// could not execute the query
		echo 'Prepared statement failed!!!\n';
		exit(mysqli_error($connect));
	}
	
	// Get the number of rows
	$result = $stmt->get_result();
	$numResult = $result->num_rows;
					 
	// If there are any rows with the same userName, then do not allow the user to user this same userName.
	if($numResult > 0)
	{
		exit("Username already exists");
	}
	else
	{
		// Clean-up
		$stmt->free_result();
		$stmt->close();
		
		// Insert user into database
		$sqlInsert = "INSERT INTO users (userName, password)
					  VALUES (?, ?)";
		
		$query = mysqli_prepare($connect, $sqlInsert);
		if(!$query)
		{
			echo 'prep stmt failed';
			exit(mysqli_error($connect));
		}
		
		$query->bind_param('ss', $user, $pass);
		if(!$query->execute())
		{
			echo 'second prep stmt failed\n';
			exit(mysqli_error($connect));
		}
		
				$query->free_result();
		$query->close();
	}
	
	// Log user in
	include 'loginUser.php';
?>
