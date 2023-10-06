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
        $search = "";

        // Collect user input within navigation bar
        $search = $info["search"];

        // Full and Partial searches
        $sql = "SELECT * FROM contacts WHERE (user_id = ? AND (first_name LIKE '%" 
        . $search . "%' OR last_name LIKE '%" 
        . $search . "%' OR email LIKE '%"
        . $search . "%' OR phone_number LIKE '%"
        . $search . "%' OR CONCAT(first_name, ' ', last_name) LIKE '%"
        . $search . "%' OR CONCAT(first_name, ' ', last_name , ' ', email) LIKE '%"
        . $search . "%' OR CONCAT(first_name, ' ', last_name , ' ', phone_number) LIKE '%"
        . $search . "%' OR CONCAT(first_name, ' ', last_name , ' ', email, ' ', phone_number) LIKE '%"
        . $search . "%'));";

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
                    "User ID"       => $row["user_id"],
                    "Contact ID"    => $row["contact_id"],
                    "First Name"    => $row["first_name"],
                    "Last Name"     => $row["last_name"],
                    "Email"         => $row["email"],
                    "Phone Number"  => $row["phone_number"],
                );

                $contacts[] = $contact;
            }

            // Convert the array to JSON
            $search = json_encode($contacts);
            sendResInfoAsJson($search);
        }

        // Failed search
        /* else
        {
            retWithContactErr("Contact(s) not found or do not belong to user.");
        } */

        // Close the database connection
        $connect->close();
    }
?>
