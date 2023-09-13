<?php
    include "Auxillary.php";

    // Check if the request method is POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") 
    {
        // Connect to the database
        $connect = db_connect();

        // Retrieve user input
        $username = $_POST["user_name"];
        $password = $_POST["password"];
        $email = $_POST["email"];

        // Validate input
        if (empty($username) || empty($password) || empty($email)) 
        {
            retWithErr("Please enter all required information.");
        }

        // Hash the password for security
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Check for database connection errors
        if ($connect->connect_error) 
        {
            retWithErr("Database connection error.");
        }

        // Check if username or email already exists
        $sql = "SELECT * FROM users WHERE username = ? OR email = ?";
        $stmt = $connect->prepare($sql);
        $stmt->bind_param("ss", $username, $email);
        $stmt->execute();

        if ($stmt->fetch()) 
        {
            retWithErr("Username or email already exists.");
        }

        else
        {
                    // Insert user data into the database
            $sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
            $stmt = $connect->prepare($sql);
            $stmt->bind_param("sss", $username, $hashedPassword, $email);

            // Successful insertion
            if ($stmt->execute()) 
            {
                echo ("User registration successful.\n");
                retWithUserInfo($stmt->insert_id, $username, $hashedPassword, $email);
            }
            
            // Failed insertion
            else
            {
                retWithErr("User registration failed.");
            }
        }


        // Close the database connection
        $stmt->close();
        $connect->close();
    }
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <header class="register-header" style="text-align:center; padding-top: 56px;">
        <h1>My Contacts Hub</h1>
    </header>
</head>

<body>
    <style>
        @import url('https://fonts.googleapis.com/css?family=Raleway:400,700');

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: Raleway, sans-serif;
        }

        body {
            background: linear-gradient(90deg, #C7C5F4, #776BCC);
        }

        .container_index {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 70vh;
        }

        .screen {
            background: linear-gradient(90deg, #5D54A4, #7C78B8);
            position: relative;
            height: 575px;
            width: 360px;
            box-shadow: 0px 0px 24px #5C5696;
        }

        .screen-content {
            z-index: 1;
            position: relative;
            height: 100%;
        }

        .screen-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 0;
            -webkit-clip-path: inset(0 0 0 0);
            clip-path: inset(0 0 0 0);
        }

        .screen-background-shape {
            transform: rotate(45deg);
            position: absolute;
        }

        .screen-background-shape1 {
            height: 400px;
            width: 520px;
            background: #FFF;
            top: -50px;
            right: 120px;
            border-radius: 0 72px 0 0;
        }

        .screen-background-shape2 {
            height: 220px;
            width: 220px;
            background: #6C63AC;
            top: -172px;
            right: 0;
            border-radius: 32px;
        }

        .screen-background-shape3 {
            height: 540px;
            width: 190px;
            background: linear-gradient(270deg, #5D54A4, #6A679E);
            top: -24px;
            right: 0;
            border-radius: 32px;
        }

        .screen-background-shape4 {
            height: 400px;
            width: 200px;
            background: #7E7BB9;
            top: 420px;
            right: 50px;
            border-radius: 60px;
        }

        .register {
            width: 320px;
            padding-left: 36px;
            padding-top: 64px;
        }

        .register-field {
            padding: 20px 0px;
            position: relative;
        }

        .register-icon {
            position: absolute;
            top: 30px;
            color: #7875B5;
        }

        .register-input {
            border: none;
            font-size: 16px;
            border-bottom: 2px solid #D1D1D4;
            color: #FFF;
            background: none;
            padding: 10px;
            padding-left: 12px;
            font-weight: 700;
            width: 100%;
            transition: .2s;
        }

        .register-input:active,
        .register-input:focus,
        .register-input:hover {
            outline: none;
            border-bottom-color: #6A679E;
        }

        .register-submit {
            background: #fff;
            text-align: center;
            font-size: 16px;
            margin-top: 20px;
            padding: 15px;
            border-radius: 26px;
            border: 1px solid #D4D3E8;
            text-transform: uppercase;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            /* Center horizontally */
            width: 100%;
            color: #4C489D;
            box-shadow: 0px 2px 2px #5C5696;
            cursor: pointer;
            transition: .2s;
        }

        .register-header {
            background: #fff;
            text-align: center;
            font-size: 16px;
            padding: 48px;
            border: 1px solid #D4D3E8;
            text-transform: uppercase;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            color: #4C489D;
            box-shadow: 0px 2px 2px #5C5696;
            cursor: pointer;
            transition: .2s;
        }

        .register-submit:hover {
            border-color: #6A679E;
            outline: none;
        }

        .button-icon {
            font-size: 24px;
            color: #7875B5;
        }

        input::placeholder {
            color: white;
        }
    </style>
    <div class="container_index">
        <div class="screen">
            <div class="screen-content">
                <form class="register" method="post">
                    <div class="register-field">
                        <input type="text" class="register-input" id="user_name" name="user_name"
                            placeholder="Enter your username" required>
                    </div>
                    <div class="register-field">
                        <input type="password" class="register-input" id="password" name="password"
                            placeholder="Enter your password" required>
                    </div>
                    <div class="register-field">
                        <input type="password" class="register-input" id="confirm_password"
                            name="confirm_password" placeholder="Confirm your password" required>
                    </div>
                    <div class="register-field">
                        <input type="text" class="register-input" id="email" name="email" 
                        placeholder="Enter your email"
                            required>
                    </div>
                    <button class="register-button register-submit" type="submit" name="submit">
                        Register <i class="button-icon fas fa-chevron-right"></i>
                    </button>
                    <div style="padding-left: 12px; padding-top: 24px; ">
                        <p style="color: #FFF; font-weight: 650;">Don't have an account?
                            <a style="color: #FFF" href="index.php">Log In</a>
                        </p>
                        <i class="button-icon fas fa-chevron-right"></i>
                    </div>
                </form>
            </div>
            <div class="screen-background">
                <span class="screen-background-shape screen-background-shape4"></span>
                <span class="screen-background-shape screen-background-shape3"></span>
                <span class="screen-background-shape screen-background-shape2"></span>
            </div>
        </div>
    </div>
</body>
</html>