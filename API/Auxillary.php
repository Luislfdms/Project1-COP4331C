<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods:  POST, GET, OPTIONS');
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: *");
    function db_connect()
    {
        return new mysqli("localhost","root", "f7d27fad0168c1c3be993102ccb65d460b1084393cb2f5cd", "contacts_db");
    }

    function sendResInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function retWithErr($error)
    {
        sendResInfoAsJson($error);
    }

    function retWithInfo($info)
    {
        sendResInfoAsJson($info);
    }
?>
