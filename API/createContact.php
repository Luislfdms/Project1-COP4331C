<?php
    session_start();

    include "Auxillary.php";

    // Check if the user is logged in
    if (!isset($_SESSION['user_id'])) 
    {
        retWithErr("User not logged in.\n");
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
        retWithErr("Database connection error.\n");
    }

    else
    {
        if (isset($_POST["first_name"]) && isset($_POST["last_name"]) && isset($_POST["email"]) && isset($_POST["phone_number"]))
        {
            $fName = $_POST["first_name"];
            $lName = $_POST["last_name"];
            $email = $_POST["email"];
            $phone = $_POST["phone_number"];
        }

        if (empty($fName) || empty($lName) || empty($email) || empty($phone))
        {
            retWithErr("Missing one or more information fields.\n");
        }

        else
        {
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
                // Insert contact data into the database
                $sql = "INSERT INTO contacts (user_id, first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?, ?)";
                $stmt = $connect->prepare($sql);
                $stmt->bind_param("sssss", $user_id, $fName, $lName, $email, $phone);

                // Successful insertion
                if ($stmt->execute())
                {
                    retWithInfo("Contact successfully added. User ID: " . $user_id . " Contact ID: " . $stmt->insert_id . "\n");
                }
                
                // Failed insertion
                else
                {
                    retWithErr("Failed to add contact.\n");
                }
            }
            // Close the database connection
            $stmt->close();
            $connect->close();
        }
    }
?>
