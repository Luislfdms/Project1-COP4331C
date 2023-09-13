<?php
    function db_connect()
    {
        return new mysqli("localhost","Group3", "GroupSLP3!", "group3");
    }

    function getReqInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
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

    function retWithUserInfo($id, $username, $password, $email)
    {
        $userInfo = array("ID" => $id, "Username" => $username, "Password" => $password, "Email" => $email);
        sendResInfoAsJson(json_encode($userInfo));
    }

    function retWithContactInfo($id, $fName, $lName, $phone, $email)
    {
        $contactInfo = array("ID" => $id, "fName" => $fName, "lName" => $lName, "Phone" => $phone, "Email" => $email);
        sendResInfoAsJson(json_encode($contactInfo));
    }
?>
    


