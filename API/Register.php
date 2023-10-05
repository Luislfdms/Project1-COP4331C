<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods:  POST, GET, OPTIONS');
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: *");
    include "Auxillary.php";

    // Connect to the database
    $connect = db_connect();

    // Check for database connection errors
    if ($connect->connect_error)
    {
        retWithErr("Database connection error.\n");
    }

    else
    {
        $username = "";
        $password = "";
        //$confirmPassword = "";

        if (isset($_POST["username"]) && isset($_POST["password"]) /* && isset($_POST["confirm_password" ])*/ )
        {
            // Retrieve user input
            $username = $_POST["username"];
            $password = $_POST["password"];
            //$confirmPassword = $_POST["confirm_password"];
        }

        // Check if passwords match
        // if ($password != $confirmPassword)
        // {
        //     retWithErr("Passwords do not match.\n");
        // }

        // Check all fields are filled
        else if (empty($username) || empty($password) /*|| empty($confirmPassword)*/ )
        {
            retWithErr("Enter information for all fields.\n");
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
                retWithErr("Username already exists.\n");
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
                    retWithInfo("User registration successful. User_ID: " . $stmt->insert_id . "\n");
                }

                // Failed insertion
                else
                {
                    retWithErr("User registration failed.\n");
                }
            }

            // Close the database connection
            $stmt->close();
            $connect->close();
        }
    }
?>
