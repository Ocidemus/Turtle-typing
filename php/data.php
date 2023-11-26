<?php 
$data = json_decode(file_get_contents('php://input'), true);
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $wpm=$data['wpm'];
    $time=$data['time'];
    $rawSpeed=$data['rawSpeed'];
    $consistency=$data['consistency'];
    $accuracy=$data['accuracy'];
    echo $wpm . " " . $time ;
}
?>