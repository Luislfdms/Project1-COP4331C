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
        // Assigned through URL when editing
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

            $fName = "";
            $lName = "";
            $email = "";
            $phone = "";

            // User input for fields
            $fName = $info["first_name"];
            $lName = $info["last_name"];
            $email = $info["email"];
            $phone = $info["phone_number"];

            if (empty($fName) || empty($lName) || empty($email) || empty($phone))
            {
                retWithErr("Enter information for all fields.");
            }

            else
            {
                // Check if a email or phone number already exist
                $sql = "SELECT * FROM contacts WHERE (email = ? OR phone_number = ?) AND user_id = ? NOT contact_id = ?";
                $stmt = $connect->prepare($sql);
                $stmt->bind_param("ssss", $email, $phone, $user_id, $contact_id);
                $stmt->execute();
                $result = $stmt->get_result();

                if ($result->num_rows > 0)
                {
                    retWithErr("A contact exists that is already associated with this email or phone number.");
                }

                else 
                {
                    // Update contact information in the database
                    $sql = "UPDATE contacts SET first_name = ?, last_name = ?, email = ?, phone_number = ? WHERE user_id = ? AND contact_id = ?";
                    $stmt = $connect->prepare($sql);
                    $stmt->bind_param("ssssss", $fName, $lName, $email, $phone, $user_id, $contact_id);
                
                    // Execute the prepared statement & successful update
                    if ($stmt->execute()) 
                    {
                        // Initialize an array to store contact data
                        $contacts = array();

                        $contact = array(
                            "user_id"       => $user_id,
                            "contact_id"    => $contact_id,
                            "first_name"    => $fName,
                            "last_name"     => $lName,
                            "email"         => $email,
                            "phone_number"  => $phone
                        );
                
                        $contacts[] = $contact;
                
                        // Convert the array to JSON
                        $search = json_encode($contacts);
                        sendResInfoAsJson($search);
                    }

                    // Failed update
                    else 
                    {
                        retWithErr("Failed to update contact with ID: $contact_id.", 500);
                    }
                
                    // Close the prepared statement
                    $stmt->close();
                }
            }
        }

        // Close the database connection
        $connect->close();
    }
?> 
