<?php
    session_start();

    include "Auxillary.php";

    // Check if the user is logged in
    if (!isset($_SESSION['user_id'])) 
    {
        retWithErr("User not logged in.\n");
        header("Location: Login.php");
    }

    else
    {
        // Retrieve user ID from the session
        $user_id = $_SESSION['user_id'];
    }

    // Connect to the database
    $connect = db_connect();

    $info = getReqInfo();

    // Check for database connection errors
    if ($connect->connect_error) 
    {
        retWithErr("Database connection error.\n");
    }

    else
    {

        $contact_id = $info["contact_id"];

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
            retWithInfo("Contact found. contact_id = $contact_id .  first_name = $fName . last_name = $lName . Email = $email . Phone = $phone" . "\n");
        } 

        else
        {
            retWithErr("Contact not found or does not belong to user.\n");
        }

        // Close the database connection
        $stmt->close();
        $connect->close();
    }
?>
