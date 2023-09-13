<?php
    session_start();

    include "Auxillary.php";

    $connect = db_connect();

    if ($connect->connect_error) 
    {
        die("Connection failed: " . $connect->connect_error);
    }

    else 
    {
        
    }
?>