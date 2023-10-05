<?php
    session_start();

    include "Auxillary.php";

    // Check if the user is logged in
    if (!isset($_SESSION['user_id'])) 
    {
        retWithErr("User not logged in.\n");
        header("Location: Login.php");
    }

    // Retrieve user ID from the session
    $user_id = $_SESSION['user_id'];

    // Connect to the database
    $connect = db_connect();
    
    // Receives User Input as JSON
    $info = getReqInfo();

    // Check for database connection errors
    if ($connect->connect_error) 
    {
        retWithErr("Database connection error.\n");
    }

    else
    {
        $contact_id = $_GET["contact_id"];

        // Check if the contact belongs to the logged-in user
        $sql = "SELECT * FROM contacts WHERE contact_id = ? AND user_id = ?";
        $stmt = $connect->prepare($sql);
        $stmt->bind_param("ss", $contact_id, $user_id);
        $stmt->execute();

        if (!$stmt->fetch()) 
        {
            retWithErr("Contact not found or does not belong to the user.\n");
        }

        else
        {
            $stmt->close();
            // Retrieve user input
            $fName = $info["first_name"];
            $lName = $info["last_name"];
            $email = $info["email"];
            $phone = $info["phone_number"];

            if (empty($fName) || empty($lName) || empty($email) || empty($phone))
            {
                retWithErr("Enter information for all fields.\n");
            }

            // Check if a email or phone number already exist
            $sql = "SELECT * FROM contacts WHERE (email = ? OR phone_number = ?) AND user_id = ?";
            $stmt = $connect->prepare($sql);
            $stmt->bind_param("sss", $email, $phone, $user_id);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0)
            {
                retWithErr("A contact exists that is already associated with this email or phone number.\n");
            }

            else
            {
                $stmt->close();
                // Update contact information in the database
                $sql = "UPDATE contacts SET first_name = ?, last_name = ?, email = ?, phone_number = ? WHERE user_id = ? AND contact_id = ?";
                $stmt = $connect->prepare($sql);
                $stmt->bind_param("ssssss", $fName, $lName, $email, $phone, $user_id, $contact_id);

                // Successful update
                if ($stmt->execute())
                {
                    retWithInfo("Contact successfully updated. contact_id = $contact_id, first_name = $fName, last_name = $lName, email = $email, phone_number = $phone") . "\n";
                }

                // Failed update
                else
                {
                    retWithErr("Failed to update contact.\n");
                }

                // Close the prepared statement
                $stmt->close();
            }
        }

        // Close the database connection
        $connect->close();
    }
?> 
