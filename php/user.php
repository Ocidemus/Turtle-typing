<?php
// Check if the request method is POST and handle the data
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents('php://input'), true);

    $servername = "localhost";
    $username = "root";
    $password = "";
    $db_name = "turtle";
    
    $conn = new mysqli($servername, $username, $password, $db_name);

    $email = isset($data['email']) ? $data['email'] : null;
    $password = isset($data['password']) ? $data['password'] : null;

    if ($email !== null && $password !== null) {
        $sql = $conn->prepare("SELECT * FROM users WHERE email=? AND password=?");
        $sql->bind_param("ss", $email, $password);
        $sql->execute();
        $result = $sql->get_result();

        if ($result->num_rows > 0) {
            $data = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($data);
        } else {
            echo "Invalid credentials";
        }
    } else {
        echo "Missing credentials";
    }
    $conn->close();
}
?>
