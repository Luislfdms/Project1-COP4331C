<?php
    function getReqInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function db_connect()
    {
        // return new mysqli("localhost","luis-souto", "Groupslp3!", "contacts_db");
        return new mysqli("localhost", "root", "", "group3");
    }

    function sendResInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function retWithContactErr($error)
    {
        $retValue = '{"User ID": "","First Name": "", "Last Name": "", "Email": "", "Phone Number: "", "Error": "' . $error . '"}';
        sendResInfoAsJson($retValue);
    }

    function retWithUserErr($error)
    {
        $retValue = '{"User ID": "", "Error": "' . $error . '"}';
        sendResInfoAsJson($retValue);
    }

    function retWithErr($error)
    {
        $retValue = '{"Error": "' . $error . '"}';
        sendResInfoAsJson($retValue);
    }

    function retWithSuccess($success)
    {
        $retValue = '{"Success": "' . $success . '"}';
        sendResInfoAsJson($retValue);
    }
?>
