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
        $fName = "";
        $lName = "";
        $email = "";
        $phone = "";

        // User input for fields
        $fName = $info["first_name"];
        $lName = $info["last_name"];
        $email = $info["email"];
        $phone = $info["phone_number"];
        $date_created = date("m/d/y");

        if (empty($fName) || empty($lName) || empty($email) || empty($phone))
        {
            retWithErr("Missing one or more information fields.");
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
                retWithErr("A contact exists that is already associated with this email or phone number.");
            }

            else
            {
                // Insert contact data into the database
                $sql = "INSERT INTO contacts (user_id, first_name, last_name, email, phone_number, date_created) VALUES (?, ?, ?, ?, ?, ?)";
                $stmt = $connect->prepare($sql);
                $stmt->bind_param("ssssss", $user_id,  $fName, $lName, $email, $phone, $date_created);

                // Successful insertion
                if ($stmt->execute())
                {
                    // Initialize an array to store contact data
                    $contacts = array();

                    $contact = array(
                        "user_id"       => $user_id,
                        "contact_id"    => $stmt->insert_id,
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
                
                // Failed insertion
                else
                {
                    retWithErr("Failed to add contact.", 500);
                }
            }
            // Close the database connection
            $stmt->close();
            $connect->close();
        }
    }
?>
