<?php 
$data = json_decode(file_get_contents('php://input'), true);
if ($_SERVER["REQUEST_METHOD"] === "POST") {
if (isset($data['cmp']) ) {
    echo "Name received: " . $data['cmp']. $data['password'];
} else {
    echo "No name provided.";
}
}
?>