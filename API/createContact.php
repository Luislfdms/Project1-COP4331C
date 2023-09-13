<?php
    session_start();

    include "Auxillary.php";

    // Check if the request method is POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        // Check if the user is logged in
        if (!isset($_SESSION['user_id'])) 
        {
            retWithErr("User not logged in.");
            header("Location: Login.php");
            exit();
        }

        // Retrieve user ID from the session
        $user_id = $_SESSION['user_id'];

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
            $fName = $_POST["first_name"];
            $lName = $_POST["last_name"];
            $email = $_POST["email"];
            $phone = $_POST["phone_number"];
    
            // Check if a email or phone number already exist
            $sql = "SELECT * FROM contacts WHERE (email = ? OR phone_number = ?) AND user_id = ?";
            $stmt = $connect->prepare($sql);
            $stmt->bind_param("sss", $email, $phone, $user_id);
            $stmt->execute();

            if ($stmt->fetch()) 
            {
                retWithErr("A contact exists that is already associated with this email or phone number.");
            }

            else
            {
                // Insert contact data into the database
                $sql = "INSERT INTO contacts (user_id, first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?, ?)";
                $stmt = $connect->prepare($sql);
                $stmt->bind_param("sssss", $user_id, $fName, $lName, $email, $phone);
    
                // Successful insertion
                if ($stmt->execute())
                {
                    retWithInfo("Contact successfully added. User ID: " . $user_id . " Contact ID: " . $stmt->insert_id);
                }
                
                // Failed insertion
                else
                {
                    retWithErr("Failed to add contact.");
                }
            }

            // Close the database connection
            $stmt->close();
            $connect->close();
        }
    }
?>
