<?php 
$data = json_decode(file_get_contents('php://input'), true);


    $servername = "localhost";
    $username = "root";
    $password = "";
    $db_name = "turtle";
    $conn = new mysqli($servername, $username, $password, $db_name);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $user_id = $data['user_id'];
    $wpm = (int)$data['wpm'];
    $time = (int)$data['time'];
    $rawSpeed = (int)$data['rawSpeed'];
    $consistency = (int)$data['consistency'];
    $accuracy = (int)$data['accuracy'];

    $tableName = "user_" . $user_id;

    $sql = "INSERT INTO `" . $tableName . "` (wpm, accuracy, rawspeed, consistency, time) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("iiiii", $wpm, $accuracy, $rawSpeed, $consistency, $time);
        $stmt->execute();
        $stmt->close();
        // echo "Data inserted successfully.";
    } else {
        // echo "Error in SQL query preparation: " . $conn->error;
    }

    $conn->close();

?>
