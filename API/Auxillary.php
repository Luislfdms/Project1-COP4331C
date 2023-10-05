<?php
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
        sendResInfoAsJson(json_encode($error));
    }

    function retWithInfo($info)
    {
        sendResInfoAsJson(json_encode($info));
    }
?>
