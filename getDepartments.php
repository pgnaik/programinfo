<?php
include("includes/db.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Fetch departments from the database
$sql = "SELECT * FROM department_master";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Create an array to store department data
    $departments = array();

    // Fetch each row from the result set
    while ($row = $result->fetch_assoc()) {
        // Add department data to the array
        $departments[] = array(
            'department_id' => $row['department_id'],
            'department_name' => $row['department_name']
        );
    }

    // Convert the array to JSON and output it
    echo json_encode($departments);
} else {
    // No departments found
    echo json_encode(array());
}
}
$conn->close();

