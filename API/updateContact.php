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

    // Check for database connection errors
    if ($connect->connect_error) 
    {
        retWithErr("Database connection error.\n");
    }

    else
    {
        // Retrieve contact ID from the URL and user input for information update
        if (isset($_GET["contact_id"]) && isset($_POST["first_name"]) && isset($_POST["last_name"]) && isset($_POST["email"]) && isset($_POST["phone_number"]))
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
                $fName = $_POST["first_name"];
                $lName = $_POST["last_name"];
                $email = $_POST["email"];
                $phone = $_POST["phone_number"];

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
        }

        else
        {
            retWithErr("Missing one or more information fields.\n");
        }

        // Close the database connection
        $connect->close();
    }
?> 
