<?php 
$data = json_decode(file_get_contents('php://input'), true);
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    //value=2 (login) and value=1(sign up)
    $value=$data['value'];
    $email;$username;$password;
    if($value==11)
    {
        $email=$data['email'];
        $password=$data['password'];
        $username=$data['username'];
    }
    else
    {
        $email=$data['email'];
        $password=$data['password'];
    }

}
?>