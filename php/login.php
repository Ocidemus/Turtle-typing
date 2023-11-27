<?php
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $db_name = "turtle";

    $conn = new mysqli($servername, $username, $password, $db_name);

    // if ($conn->connect_error) {
    //     die("Connection failed: " . $conn->connect_error);
    // }

    $value = isset($data['value']) ? $data['value'] : null;
    $email = isset($data['email']) ? $data['email'] : null;
    $password = isset($data['password']) ? $data['password'] : null;
    $username = isset($data['username']) ? $data['username'] : null;

    if ($value == 1) {
            $sql = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
            $sql->bind_param("sss", $username, $email, $password);
            $sql->execute();

            // create a table for user
            $q = "call CreateIndividualUserTables()";
            $res = mysqli_query($conn, $q);

            if($res){
                echo "Welcome $username!";
            }
        }
    else {
            $sql = $conn->prepare("SELECT * FROM users WHERE email=? AND password=?");
            $sql->bind_param("ss", $email, $password);
            $sql->execute();
            $result = $sql->get_result();
            if ($result->num_rows > 0) {
                $data = $result->fetch_assoc();
                echo $data['username'];
            }
        }
    $conn->close();
}
?>