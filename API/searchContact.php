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
            if (isset($_POST["contact_id"])) 
            {
                $contact_id = $_POST["contact_id"];
            } 
            
            else 
            {
                retWithErr("Contact ID not provided.");
            }

            // Search for a contact associated with the user
            $sql = "SELECT * FROM contacts WHERE user_id = ? AND contact_id = ?";
            $stmt = $connect->prepare($sql);
            $stmt->bind_param("ss", $user_id, $contact_id);
            $stmt->execute();

            // Check if a contact was found
            $result = $stmt->get_result();

            if ($result->num_rows > 0) 
            {
                // Fetch the contact details
                $row = $result->fetch_assoc();
                $fName = $row["first_name"];
                $lName = $row["last_name"];
                $email = $row["email"];
                $phone = $row["phone_number"];

                // Display the contact details
                retWithInfo("Contact found. contact_id = $contact_id .  first_name = $fName . last_name = $lName . Email = $email . Phone = $phone");
            } 
            
            else 
            {
                retWithErr("Contact not found.");
            }

            // Close the database connection
            $stmt->close();
            $connect->close();
        }
    }
?>
