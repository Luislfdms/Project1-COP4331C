<?php

    include "Auxillary.php";

    // Check if the request method is POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        // Check if form fields are set
        if (isset($_POST["user_name"]) && isset($_POST["password"]) && isset($_POST["confirm_password"])) 
        {
            // Connect to the database
            $connect = db_connect();

            // Check for database connection errors
            if ($connect->connect_error) 
            {
                retWithErr("Database connection error.");
            }
            
            else
            {
                // Retrieve user input
                $username = $_POST["user_name"];
                $password = $_POST["password"];
                $confirmPassword = $_POST["confirm_password"];

                // Check if passwords match
                if ($password != $confirmPassword)
                {
                    retWithErr("Passwords do not match.");
                }

                else
                {
                    // Hash the password for security
                    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                    // Check if username already exists
                    $sql = "SELECT * FROM users WHERE username = ?";
                    $stmt = $connect->prepare($sql);
                    $stmt->bind_param("s", $username);
                    $stmt->execute();

                    if ($stmt->fetch())
                    {
                        retWithErr("Username already exists.");
                    }

                    else
                    {
                        $stmt->close();
                        // Insert user data into the database
                        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
                        $stmt = $connect->prepare($sql);
                        $stmt->bind_param("ss", $username, $hashedPassword);

                        // Successful insertion
                        if ($stmt->execute())
                        {
                            retWithInfo("User registration successful. User_ID: " . $stmt->insert_id);
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
            }
        }
    }
?>
