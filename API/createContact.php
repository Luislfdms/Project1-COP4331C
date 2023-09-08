<?
    $contactID = "";
    $fName = "";
    $lName = "";
    $phone = "";
    $email = "";
    $address = "";
    
    $connect = new mysqli("localhost","Group3", "SLP3", "Project1-COP4331C");

    if ($connect->connect_error) {
        die("Connection failed: " . $connect->connect_error);
    }
    else {
        
    }
?>