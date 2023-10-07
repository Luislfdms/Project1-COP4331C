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
        header('Content-Type: application/json');
        echo $obj;
    }

    function retWithErr($error, $code=403)
    {
        $retValue = '{"error": "' . $error . '"}';
        http_response_code($code);
        sendResInfoAsJson($retValue);
    }

    function retWithSuccess($success)
    {
        $retValue = '{"Success": "' . $success . '"}';
        sendResInfoAsJson($retValue);
    }
?>
