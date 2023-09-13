<?
    include "Auxillary.php";

    $dataInfo = getReqInfo();

    $id = $dataInfo["id"];;
    $fName = $dataInfo["fName"];
    $lName = $dataInfo["lName"];
    $phone = $dataInfo["phone"];
    $email = $dataInfo["email"];
    $error = "";
    $info = "";

    $connect = db_connect();

    if ($connect->connect_error) 
    {
        die("Connection failed: " . $connect->connect_error);
    }

    else 
    {
        
    }
?>