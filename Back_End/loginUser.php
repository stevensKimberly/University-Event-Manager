<?php
	require_once 'session.php';

	// Connection to database.
	require('connect.php');
	
	// Get information user entered.
	$user = $_POST['username'];
	$pass = $_POST['password'];
	
	// Prepared statement to see if there is a user with a matching username and password.
	$sql = "SELECT userId 
			FROM users 
			WHERE userName = ? AND password = ?";
			
	// Have the database parse the SQL.
	$stmt = mysqli_prepare($connect, $sql);
	if (!$stmt) {
		// could not compile the query (problem with query)
		exit(mysqli_error($connect));
	}
	
	// Populate the placeholders.
	$stmt->bind_param('ss', $user, $pass);
	
	// Execute the query with placeholders populated.
	if (!$stmt->execute()) {
		// could not execute the query
		echo 'Prepared statement failed!!!\n';
		exit(mysqli_error($connect));
	}
	
	// If that user exists, then create a session with their userID.
	$matchedUser = false;
	$stmt->bind_result($userId);
	if($stmt->fetch())
	{
		$_SESSION['logged-in-user'] = $userId;
		logUserIn($_SESSION['logged-in-user']);
		$matchedUser = true;
	}
	
	// Clean up.
	$stmt->free_result();
	$stmt->close();
	
	if (!$matchedUser) {
		exit('no user found');
	}
