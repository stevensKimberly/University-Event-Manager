<?php
	session_start();
	
	function logUserIn($userId) {
		$_SESSION['logged-in-user'] = $userId; // Add data to session.
		header('Location: index.html');
		exit(0);
	}
	
	function isLoggedIn() {
		return isset($_SESSION['logged-in-user']);
	}
	
	function logOut() {
		unset($_SESSION['logged-in-user']); // Remove data from session.
		header('Location: login.html');
		exit(0);
	}
?>
