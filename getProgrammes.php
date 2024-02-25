<?php
include("includes/db.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $department_id = $_POST["department_id"];
    $stmt = $conn->prepare("SELECT * FROM programme_master WHERE department_id = ?");
    $stmt->bind_param("i", $department_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $programs = array();
    while ($row = $result->fetch_assoc()) {
        $programs[] = $row;
    }
    echo json_encode($programs);
    $stmt->close();
}
$conn->close();
?>
