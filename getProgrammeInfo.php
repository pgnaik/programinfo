<?php
include("includes/db.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $programmeId = $_POST["programme_id"];

    // Fetch program details from the database
    $stmt = $conn->prepare("SELECT * FROM programme_master WHERE programme_id = ?");
    $stmt->bind_param("i", $programmeId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $programInfo = $result->fetch_assoc();
        echo json_encode($programInfo);
    } else {
        echo json_encode(array("error" => "Program not found"));
    }

    $stmt->close();
}

$conn->close();