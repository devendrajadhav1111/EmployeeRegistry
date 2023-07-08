$(document).ready(function () {
    // Load employee data on page load
    loadEmployeeData();

});

// Function to load employee data using AJAX
function loadEmployeeData() {
    $.ajax({
        url: '/Employee/GetEmployees', 
        type: 'GET',
        success: function (response) {
            // Call function to bind data to the HTML table
            bindDataToTable(response.data);
        },
        error: function () {
            // Handle the error response, such as displaying an error message
            alert("An error occurred while loading employee data.");
        }
    });
}

// Function to bind data to the HTML table
function bindDataToTable(data) {
    var tableBody = $("#employeeTable tbody");
    tableBody.empty();

    if (data.length > 0) {
        // Iterate over the data and create table rows
        $.each(data, function (index, employee) {
            var row = "<tr>" +
                "<th scope='row'>" + employee.Id + "</td>" +
                "<td>" + employee.EmployeeName + "</td>" +
                "<td>" + employee.EmployeeAge + "</td>" +
                "<td>" + employee.EmployeeAddress + "</td>" +
                "<td>" + employee.State + "</td>" +
                "<td>" + employee.District + "</td>" +
                "<td><button class='editButton' data-id='" + employee.Id + "'>Edit</button> " +
                "<button class='deleteButton' data-id='" + employee.Id + "'> Delete</button ></td> " +
                "</tr>";
            tableBody.append(row);
        });
    }
    else {
        var row = "<tr>" +
            "<th scope='row' colspan='6'>No Data Found.</td>" 
            "</tr>";
        tableBody.append(row);
    }


    // Add click event handler for the edit buttons
    $(".editButton").click(function () {
        var employeeId = $(this).data("id");
        // Redirect to the edit page 

        var url = $("#RedirectTo").val();
        window.location.href = url + '?empid=' + employeeId;
    });

    $(".deleteButton").click(function () {

        var employeeId = $(this).data("id");
        if (confirm("Are you sure to delete the employee with Id -" + employeeId)) {


            $.ajax({
                url: '/Employee/DeleteEmployee',
                data: { empId: employeeId },
                datatype: "Json",
                method: 'Post',
                success: function (response) {

                    if (response.success) {
                        alert(response.message);
                        loadEmployeeData();

                    } else {
                        alert(response.Message);
                    }
                },
                error: function (xhr, status, error) {
                    console.log('Error: ' + error);
                }
            });

        }

    });
}