$(document).ready(function () {

    function getDepartments() {
        // AJAX request to get departments
        $.ajax({
            type: "POST",
            url: "http://localhost/programinfo/getDepartments.php",
            success: function (response) {
                var departments = JSON.parse(response);
                populateDepartmentsDropdown(departments);
            }
        });
    }

    
    function getProgrammes() {
        // Get the selected department id
        var departmentId = $("#department").val();

        // Check if a department is selected
        if (departmentId) {
            // Call the function to fetch programmes based on the selected department
            fetchProgrammesForDepartment(departmentId);
        } else {
            // Optionally, handle the case where no department is selected
            console.log("No department selected");
        }
    }

    function populateDepartmentsDropdown(departments) {
        var departmentDropdown = $("#department");
        departmentDropdown.empty();

        departments.forEach(function (department) {
            departmentDropdown.append(
                $("<option></option>")
                    .attr("value", department.department_id)
                    .text(department.department_name)
            );
        });

        // After populating departments, you can optionally fetch programmes for the default department
        var defaultDepartmentId = departments.length > 0 ? departments[0].department_id : null;
        if (defaultDepartmentId) {
            // Call a function to fetch programmes based on the default department
            fetchProgrammesForDepartment(defaultDepartmentId);
        }
    }

    function fetchProgrammesForDepartment(departmentId) {
        // AJAX request to fetch programmes based on the selected department
        $.ajax({
            type: "POST",
            url: "http://localhost/programinfo/getProgrammes.php",
            data: { department_id: departmentId },
            success: function (response) {
                var programmes = JSON.parse(response);
                populateProgrammesDropdown(programmes);
            }
        });
    }

    function populateProgrammesDropdown(programmes) {
        var programmeDropdown = $("#programme");
        programmeDropdown.empty();

        programmes.forEach(function (programme) {
            programmeDropdown.append(
                $("<option></option>")
                    .attr("value", programme.programme_id)
                    .text(programme.programme_name)
            );
        });
    }

  // Add a change event handler for the programme dropdown
$("#programme").on("change click", function () {
    var selectedProgrammeId = $(this).val();

    // Call a function to display program information based on the selected programme
    displayProgramInfo(selectedProgrammeId);
});

function displayProgramInfo(programmeId) {
    // AJAX request to fetch program information based on the selected programme
    $.ajax({
        type: "POST",
        url: "http://localhost/programinfo/getProgrammeInfo.php",
        data: { programme_id: programmeId },
        success: function (response) {
            console.log(response);
            var programInfo = JSON.parse(response);
            
            // Call a function to update the UI with the program information
            updateProgramInfoUI(programInfo);
        }
    });
}

function updateProgramInfoUI(programInfo) {
    var programInfoContainer = $("#programInfo");
    programInfoContainer.empty();

    if (programInfo.error) {
        programInfoContainer.html("<p>Error: " + programInfo.error + "</p>");
    } else {
        // Create a rounded rectangle and display program information attractively
        var roundedRectangle = $("<div></div>")
        .css({
            "border-radius": "10px", // Adjust as needed
            "padding": "10px",
            "background-color": "#f0f0f0" // Adjust background color
        })
            .html("<h3>" + programInfo.programme_name + "</h3>" +
                  "<p>Duration: " + programInfo.duration + " years</p>" +
                  "<p>Fee: INR " + programInfo.fee + "</p>");

        programInfoContainer.append(roundedRectangle);
    }
}


    // Initial call to get departments and populate the dropdown when the page loads
    getDepartments();
    $("#department").change(function () {
        getProgrammes();
    });
});
