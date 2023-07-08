$(document).ready(function () {

    GetStates();


    if ($("#empId").val() > 0) {
        GetEmployeeToEdit($("#empId").val());
    }

    $('#ddlStates').change(function () {
        var stateId = $(this).val(); // Get the selected state ID

        GetDistricts(stateId);
    });

    $('#btnSubmit').click(function (e) {
        e.preventDefault(); // Prevent the form from submitting by default
        InsertEmployee();

    });
});

function InsertEmployee() {

        // Perform your validation logic here
        var isValid = true;

        // Example validation: Check if a field is empty
        if ($('#txtName').val() === '') {
            isValid = false;
            // Display an error message or highlight the field
            alert("Enter the name");
            $('#txtName').focus();
            return;
    } 

    if ($('#txtAge').val() === '') {
        isValid = false;
        // Display an error message or highlight the field
        alert("Enter the Age");
        $('#txtAge').focus();
        return;
    } 

    if ($('#txtAddress').val() === '') {
        isValid = false;
        // Display an error message or highlight the field
        alert("Enter the Address");
        $('#txtAddress').focus();
        return;
    } 

    if ($('#ddlStates').val() === "0") {
        alert('Please select State.'); // Display an error message
        $('#ddlStates').focus();
        return false; // Prevent form submission
    }

    if ($('#ddlDistricts').val() === "0") {
        alert('Please select District.'); // Display an error message
        $('#ddlDistricts').focus();
        return false; // Prevent form submission
    }

        // Add more validation logic as needed for other fields

        // Submit the form if validation passes
    if (isValid) {
        var name = $("#txtName").val();
        var age = $("#txtAge").val();
        var address = $("#txtAddress").val();
        var stateId = $("#ddlStates").val();
        var distID = $("#ddlDistricts").val();

        var empObj = {
            ID: $("#empId").val(),
            EmployeeName: name,
            EmployeeAge: age,
            EmployeeAddress: address,
            StateId: stateId,
            DistId: distID
        }

            $.ajax({
                url: '/Employee/AddOrEditEmployee', // Replace with your server endpoint URL
                data: empObj,
                datatype: "Json",
                method: 'Post',
                success: function (response) {
                    // Handle the validation response
                    if (response.success) {
                        alert(response.message);
                        ClearForm();
                        var url = $("#RedirectTo").val();
                        window.location.href = url;

                    } else {
                        alert(response.Message);
                    }
                },
                error: function (xhr, status, error) {
                    console.log('Error: ' + error);
                }
            });
        }
   

}


function ClearForm() {
    $("#txtName").val("");
    $("#txtAge").val("");
    $("#txtAddress").val("");
    $("#ddlStates").empty();
    $('#ddlDistricts').empty();

}

function GetEmployeeToEdit(empId) {

    $.ajax({
        url: '/Employee/GetEmployeeToEdit',  // Replace with your server endpoint URL
        type: 'GET',
        data: { empId: empId },
        dataType: 'json',
        success: function (response) {
            $('#txtName').val(response.data.EmployeeName);
            $('#txtAge').val(response.data.EmployeeAge);
            $('#txtAddress').val(response.data.EmployeeAddress);
            $("#ddlStates").val(response.data.StateId);
            $("#ddlStates").trigger("change");
            $('#ddlDistricts').val(response.data.DistId);
          
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error);
        }
    });
}

function GetStates() {

    $.ajax({
        url: '/Employee/GetStates',  // Replace with your server endpoint URL
        type: 'GET',
        dataType: 'json',
        success: function (states) {
            // Populate the dropdown with the retrieved states
            $.each(states.data, function (index, state) {
                $('#ddlStates').append('<option value="' + state.StateId + '">' + state.StateName + '</option>');
            });
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error);
        }
    });
}

function GetDistricts(stateId) {

    // Make the AJAX request
    $.ajax({
        url: '/Employee/GetDistricts', // Replace with your server endpoint URL
        type: 'GET',
        data: { stateId: stateId },
        dataType: 'json',
        success: function (districts) {
            // Clear previous options
            $('#ddlDistricts').empty();

            // Populate the districts dropdown
            $.each(districts.data, function (index, district) {
                $('#ddlDistricts').append('<option value="' + district.DistId + '">' + district.DistrictName + '</option>');
            });
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error);
        }
    });
}
