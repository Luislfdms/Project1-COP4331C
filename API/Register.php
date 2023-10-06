<?php
    include "Auxillary.php";

    // Connect to the database
    $connect = db_connect();

    // Receives User Input as JSON
    $info = getReqInfo();

    // Check for database connection errors
    if ($connect->connect_error)
    {
        retWithErr("Database connection error.", 500);
    }

    else
    {
        $username = "";
        $password = "";

        // User input for fields
        $username = $info["username"];
        $password = $info["password"];

        // Check all fields are filled
        if (empty($username) || empty($password))
        {
            retWithErr("Enter information for all fields.");
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

                // Successful registration
                if ($stmt->execute())
                {   
                    sendResInfoAsJson(json_encode(array("user_id" => $stmt->insert_id)))
                    // retWithSuccess("User registration successful. User_ID: $stmt->insert_id");
                }

                // Failed registration
                else
                {
                    retWithUserErr("User registration failed.", 500);
                }
            }

            // Close the database connection
            $stmt->close();
            $connect->close();
        }
    }
?>
