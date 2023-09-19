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
            // Retrieve contact ID from the URL and user input for information update
            if (isset($_GET["contact_id"]) && isset($_POST["first_name"]) && isset($_POST["last_name"]) && isset($_POST["email"]) && isset($_POST["phone_number"]))
            {
                // Retrieve contact ID assigned by the database to update information
                $contact_id = $_GET["contact_id"];

                // Retrieve user input
                $fName = $_POST["first_name"];
                $lName = $_POST["last_name"];
                $email = $_POST["email"];
                $phone = $_POST["phone_number"];

                // Update contact information in the database
                $sql = "UPDATE contacts SET first_name = ?, last_name = ?, email = ?, phone_number = ? WHERE user_id = ? AND contact_id = ?";
                $stmt = $connect->prepare($sql);
                $stmt->bind_param("ssssss", $fName, $lName, $email, $phone, $user_id, $contact_id);

                // Successful update
                if ($stmt->execute())
                {
                    retWithInfo("Contact successfully updated. contact_id = $contact_id, first_name = $fName, last_name = $lName, email = $email, phone_number = $phone");
                }

                // Failed update
                else
                {
                    retWithErr("Failed to update contact.");
                }

                // Close the prepared statement
                $stmt->close();
            }

            else
            {
                retWithErr("Missing one or more information fields.");
            }

            // Close the database connection
            $connect->close();
        }
    }
?> 
