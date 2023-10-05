<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods:  POST, GET, OPTIONS');
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: *");

    function getReqInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function db_connect()
    {
        return new mysqli("localhost","luis-souto", "Groupslp3!", "contacts_db");
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
