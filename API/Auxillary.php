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

    function retWithContactErr($error, $code=403)
    {
        $retValue = '{"User ID": "","First Name": "", "Last Name": "", "Email": "", "Phone Number: "", "error": "' . $error . '"}';
        http_response_code($code);
        sendResInfoAsJson($retValue);
    }

    function retWithUserErr($error, $code=403)
    {
        $retValue = '{"User ID": "", "error": "' . $error . '"}';
        http_response_code($code);
        sendResInfoAsJson($retValue);
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
