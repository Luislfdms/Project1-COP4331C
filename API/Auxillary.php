<?php
    function db_connect()
    {
        return new mysqli("localhost","root", "", "group3");
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
    
