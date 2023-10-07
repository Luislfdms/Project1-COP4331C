<?php
    session_start();

    include "Auxillary.php";

    // Connect to the database
    $connect = db_connect();

    // Receives User Input as JSON
    $info = getReqInfo();

    // Receives User ID from front-end
    $user_id = $info["user_id"];

    // Check for database connection errors
    if ($connect->connect_error) 
    {
        retWithErr("Database connection error.", 500);
    } 

    else
    {
        $contact_id = "";

        // User input for field
        $contact_id = $info["contact_id"];

        // Check if the contact belongs to the logged-in user
        $sql = "SELECT * FROM contacts WHERE contact_id = ? AND user_id = ?";
        $stmt = $connect->prepare($sql);
        $stmt->bind_param("ss", $contact_id, $user_id);
        $stmt->execute();

        if (!$stmt->fetch()) 
        {
            retWithErr("Contact with ID: $contact_id not found or does not belong to the user with ID: $user_id.");
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
                retWithSuccess("Contact: $contact_id successfully deleted.");
            }
            
            // Failed deletion
            else
            {
                retWithErr("Failed to delete Contact: $contact_id.", 500);
            }
        }

        // Close the database connection
        $stmt->close();
        $connect->close();
    }
?>
