<?php
    include "Auxillary.php";

    // Check if the request method is POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        // Connect to the database
        $connect = db_connect();

        // Retrieve user input
        $username = $_POST["user_name"];
        $password = $_POST["password"];
        $email = $_POST["email"];

        // Validate input
        if (empty($username) || empty($password) || empty($email)) 
        {
            retWithErr("Please enter all required information.");
        }

        // Hash the password for security
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Check for database connection errors
        if ($connect->connect_error) 
        {
            retWithErr("Database connection error.");
        }

        // Check if username or email already exists
        $sql = "SELECT * FROM users WHERE username = ? OR email = ?";
        $stmt = $connect->prepare($sql);
        $stmt->bind_param("ss", $username, $email);
        $stmt->execute();

        if ($stmt->fetch()) 
        {
            retWithErr("Username or email already exists.");
        }

        else
        {
                    // Insert user data into the database
            $sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
            $stmt = $connect->prepare($sql);
            $stmt->bind_param("sss", $username, $hashedPassword, $email);

            // Successful insertion
            if ($stmt->execute()) 
            {
                echo ("User registration successful.\n");
                retWithUserInfo($stmt->insert_id, $username, $hashedPassword, $email);
            }
            
            // Failed insertion
            else
            {
                retWithErr("User registration failed.");
            }
        }

        // Close the database connection
        $stmt->close();
        $connect->close();
    }
?>
