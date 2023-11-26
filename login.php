<?php 
$data = json_decode(file_get_contents('php://input'), true);
if ($_SERVER["REQUEST_METHOD"] === "POST") {
if (isset($data['value']) && $data['value']===2) {
    echo "Name received: " . $data['email'];
} else {
    echo "No name provided.";
}
}
?>