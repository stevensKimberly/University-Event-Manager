<!DOCTYPE html>
<?php
	// Connection to database.
	require('connect.php');
	
	// Get information user entered.
	$user = $_POST['username'];
	$pass = $_POST['password'];
	
	// Check that a row for this username and password exists.
	$sqlChkUser = "SELECT userId
				   FROM users
				   WHERE userName = '$user' AND password = '$pass'";
				   
	$result = mysqli_query($connect, $sqlChkUser);
	$numResult = mysqli_num_rows($result);

	// Return error message if the information is incorrect.
	if($numResult != 1)
	{
		exit("Invalid login information");
	}
	
	// $id holds the user id of the user to load the proper events later, other pages will require this information.
	$row = $result->fetch_assoc();
	$id = (int) $row['userId'];
?>