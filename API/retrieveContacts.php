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
        // Searches all contacts associated with user
        $sql = "SELECT * FROM contacts WHERE user_id = ?";
        $stmt = $connect->prepare($sql);
        $stmt->bind_param("s", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        // if ($result->num_rows > 0)
        {
            // Initialize an array to store contact data
            $contacts = array();

            // Fetch the contact details and display all of them
            while ($row = $result->fetch_assoc())
            {
                $contact = array(
                    "user_id"      => $row["user_id"],
                    "contact_id"   => $row["contact_id"],
                    "first_name"   => $row["first_name"],
                    "last_name"    => $row["last_name"],
                    "email"        => $row["email"],
                    "phone_number" => $row["phone_number"],
                );

                $contacts[] = $contact;
            }
            
            // Convert the array to JSON
            $search = json_encode($contacts);
            sendResInfoAsJson($search);
        }
        // Close the database connection
        $connect->close();
    }
?>
