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
            // Retrieve contact ID from the user input
            $contact_id = $_POST["contact_id"];

            // Check if the contact belongs to the logged-in user
            $sql = "SELECT * FROM contacts WHERE contact_id = ? AND user_id = ?";
            $stmt = $connect->prepare($sql);
            $stmt->bind_param("ss", $contact_id, $user_id);
            $stmt->execute();

            if (!$stmt->fetch()) 
            {
                retWithErr("Contact not found or does not belong to the user.");
            }

            else
            {
                $stmt->close();
                // Delete the contact from the database
                $sql = "DELETE FROM contacts WHERE contact_id = ?";
                $stmt = $connect->prepare($sql);
                $stmt->bind_param("s", $contact_id);

                // Successful deletion
                if ($stmt->execute()) 
                {
                    retWithInfo("Contact successfully deleted.");
                } 
                
                else 
                {
                    retWithErr("Failed to delete contact.");
                }
            }

            // Close the database connection
            $stmt->close();
            $connect->close();
        }
    }
?>
