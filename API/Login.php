<?php
    session_start();
    
    include "Auxillary.php";
    
    // Connect to the database
    $connect = db_connect();

    // Receives User Input as JSON
    $info = getReqInfo();

    // Check for database connection errors
    if ($connect->connect_error)
    {
        retWithErr("Database connection error.");
    }

    else
    {
        $username = "";
        $password = "";

        // User input for fields
        $username = $info["username"];
        $password = $info["password"];

        if (empty($username) || empty($password))
        {
            retWithErr("Username or password not provided.");
        }

        else
        {
            // Query the database for the username to verify if it exists
            $sql = "SELECT user_id, username, password FROM users WHERE username = ?";
            $stmt = $connect->prepare($sql);
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) 
            {
                $user_data = $result->fetch_assoc();

                // Verify the hashed password & successful login
                if (password_verify($password, $user_data['password'])) 
                {
                    retWithSuccess("Login successful. User_ID: $user_data[user_id]" . "");
                }

                // Failed login
                else
                {
                    retWithErr("Incorrect password.");
                }
            }

            // Failed login
            else
            {
                retWithUserErr("User does not exist.");
            }
            
            // Close the database connection
            $stmt->close();
            $connect->close();
        }
    }
?>
