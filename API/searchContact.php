<?php
    session_start();

    include "Auxillary.php";

    // Check if the user is logged in
    if (!isset($_SESSION['user_id'])) 
    {
        retWithErr("User not logged in.");
        header("Location: Login.php");
    }

    else
    {
        // Retrieve user ID from the session
        $user_id = $_SESSION['user_id'];
    }

    // Connect to the database
    $connect = db_connect();

    // Receives User Input as JSON
    $info = getReqInfo();

    // Check for database connection errors
    if ($connect->connect_error) 
    {
        retWithErr("Database connection error.");
    }

    else
    {
        echo "Inside else statement";

        $search = "";

        // Collect user input within navigation bar
        $search = $info["search"];

        // Full and Partial searches
        $sql = "SELECT * FROM CONTACTS WHERE (user_id =" . $user_id . " AND (first_name LIKE '%" 
        . $search . "%' OR last_name LIKE '%" 
        . $search . "%' OR email LIKE '%"
        . $search . "%' OR phone_number LIKE '%"
        . $search . "%' OR CONCAT(first_name, ' ', last_name) LIKE '%"
        . $search . "%' OR CONCAT(first_name, ' ', last_name , ' ', email) LIKE '%"
        . $search . "%' OR CONCAT(first_name, ' ', last_name , ' ', phone_number) LIKE '%"
        . $search . "%' OR CONCAT(first_name, ' ', last_name , ' ', email, ' ', phone_number) LIKE '%"
        . $search . "%'));";

        echo "before sql statement";

        $result = $connect->query($sql);

        echo "after sql statement";

        if ($result->num_rows > 0)
        {
            echo "inside result statement";
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
            
            echo "Before json_encode";

            // Convert the array to JSON
            $search = json_encode($contacts);
            sendResInfoAsJson($search);
        }

        // Failed search
        else
        {
            retWithContactErr("Contact(s) not found or do not belong to user.");
        }

        // Close the database connection
        $connect->close();
    }
?>
