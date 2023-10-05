<?php
    session_start();

    include "Auxillary.php";

    // Check if the user is logged in
    if (!isset($_SESSION['user_id'])) 
    {
        retWithErr("User not logged in.");
        header("Location: Login.php");
        exit();
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
        retWithErr("Database connection error.");
    }

    else
    {
        $fName = "";
        $lName = "";
        $email = "";
        $phone = "";

        $fName = $info["first_name"];
        $lName = $info["last_name"];
        $email = $info["email"];
        $phone = $info["phone_number"];

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
                retWithContactErr("A contact exists that is already associated with this email or phone number.");
            }

            else
            {
                // Insert contact data into the database
                $sql = "INSERT INTO contacts (user_id, first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?, ?)";
                $stmt = $connect->prepare($sql);
                $stmt->bind_param("sssss", $user_id,  $fName, $lName, $email, $phone);

                // Successful insertion
                if ($stmt->execute())
                {
                    // Initialize an array to store contact data
                    $contacts = array();

                    $contact = array(
                        "User ID"       => $user_id,
                        "Contact ID"    => $stmt->insert_id,
                        "First Name"    => $fName,
                        "Last Name"     => $lName,
                        "Email"         => $email,
                        "Phone Number"  => $phone
                    );
            
                    $contacts[] = $contact;
            
                    // Convert the array to JSON
                    $search = json_encode($contacts);
                    sendResInfoAsJson($search);
                }
                
                // Failed insertion
                else
                {
                    retWithContactErr("Failed to add contact.");
                }
            }
            // Close the database connection
            $stmt->close();
            $connect->close();
        }
    }
?>
