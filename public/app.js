/* home.handlebars */

    /* Access tabs in the home page. */
    $(document).ready(function(){
        $('.tabs').tabs();

        var uid = null;
        firebase.auth().onAuthStateChanged(function(user){
            if (user){
                uid = user.uid;
                console.log(uid);
                console.log(window.location.href);
            }
            else {
                uid = null;
                window.location.replace("/");
            }
        })

    /* Populating all the data within the directory and birthdays with an AJAX call */
        $.getJSON('/directory', function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $("#studentTable").append(
                    "<tr>" +
                        "<td>" + data[i].name + "</td>" + 
                        "<td>" + data[i].grade + "</td>" +
                        "<td>" + data[i].birthday + "</td>" +
                        "<td>" + data[i].location + "</td>" +
                        "<td> <button class='btn modal-trigger editStudent' data-value=" + "edit" + data[i]._id + " data-target='editStudentModal'> EDIT </button> </td>" +
                        "<td> <button class='btn deleteStudent' data-value=" + "delete" + data[i]._id + " id='delete'> DELETE </button> </td>" +
                    "</tr>"
                );
            }
            $(".preloader-wrapper").css("visibility", "hidden");
        });

    /* ------------------- JAVASCRIPT FOR DIRECTORY TAB ------------------- */
    /* Allows the dropdown menus to be triggerable. */
        $('.sort-trigger').dropdown();
        $('.gradepicker').dropdown();

    /* 
        When a dropdown grade is clicked (not within the addStudent Modal), 
        Change the text on the dropdown menu button
        Append all information with the corresponding dropdown item
    */    
        $(".dropdownGrade").on("click", function(){
            const selectedGrade = $(this).attr("data-grade");

            $("#sortDD").text(selectedGrade);

            $("#studentTable").empty();

            $.getJSON('/directory/' + selectedGrade, function(data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    $("#studentTable").append(
                        "<tr>" +
                            "<td>" + data[i].name + "</td>" + 
                            "<td>" + data[i].grade + "</td>" +
                            "<td>" + data[i].birthday + "</td>" +
                            "<td>" + data[i].location + "</td>" +
                            "<td> <button class='btn modal-trigger editStudent' data-value=" + "edit" + data[i]._id + " data-target='editStudentModal'> EDIT </button> </td>" +
                            "<td> <button class='btn deleteStudent' data-value=" + "delete" + data[i]._id + " id='delete'> DELETE </button> </td>" +
                        "</tr>"
                    );
                }
            });
        });

    /*
        When a dropdown grade is clicked (within the add/editStudent Modal),
        Put the selected grade into the corresponding modal field
    */
        $(".aSGradeV").on("click", function(){
            $("#aSGrade").val($(this).attr("data-grade"));
            $("#eSGrade").val($(this).attr("data-grade"));
        });

    /* Activating datepicker to be used within the addStudent Modal */
        $('.datepicker').datepicker();

    /* 
        Receive the list of towns previously entered through other students 
        The list of towns now becomes a list that can be accessed through autocompletion for the add/editStudent Modal
    */
        $.getJSON('/directory', function(data) {
            let autoCompleteTowns = {};
            for (var i = 0; i < data.length; i++) {
                const town = data[i].location;
                autoCompleteTowns[town] = null;
            }
            $('input.autocomplete').autocomplete({ data : autoCompleteTowns });
        });

    /*  
        When the Add Student Button is clicked,
        Receive entered values
        Validate values
        If values are properly entered
            Perform an AJAX call to add the student into the database
            Clear the values so that another student can be entered
            Update the table
        Else
            TODO : Let the user know that there was some incorrect information entered
    */
        $("#addStudentButton").on("click", function(event){
            event.preventDefault();

            const name = $("#aSName").val().trim();
            const grade = $("#aSGrade").val().trim();
            const birthday = $("#aSBirthday").val().trim();
            const location = $("#aSLocation").val().trim();

            if (validateFields(grade, birthday, location)){
                $.ajax({
                    method: "POST",
                    url: "/all/students",
                    data: {
                        name: name,
                        grade: grade,
                        birthday: birthday,
                        location: location
                    }
                });
    
                $("#aSName").val("");
                $("#aSGrade").val("");
                $("#aSBirthday").val("");
                $("#aSLocation").val("");
    
                $("#studentTable").empty();
            
                $.getJSON('/directory', function(data) {
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        $("#studentTable").append(
                            "<tr>" +
                                "<td>" + data[i].name + "</td>" + 
                                "<td>" + data[i].grade + "</td>" +
                                "<td>" + data[i].birthday + "</td>" +
                                "<td>" + data[i].location + "</td>" +
                                "<td> <button class='btn modal-trigger editStudent' data-value=" + "edit" + data[i]._id + " data-target='editStudentModal'> EDIT </button> </td>" +
                                "<td> <button class='btn deleteStudent' data-value=" + "delete" + data[i]._id + " id='delete'> DELETE </button> </td>" +
                            "</tr>"
                        );
                    }
                });
            }
            else{
                $("#asGuideline").html("* : can be empty <br><br> ERROR IN ADDING STUDENT: Please follow the correct formats");
                console.log($("#asGuideline").text());
            }

        });

    /*  
        When the edit student button is clicked,
        TODO : Find the specific student's information
        TODO : Enter it into the corresponding fields
    */
        $(document).on("click", ".editStudent", function(event){
            event.preventDefault();

            const id = $(this).attr("data-value").substring(4);
            console.log(id);

            $.getJSON('/edit/students/' + id, function(data) {
                console.log(data);
                
                /* $("#eSName").val(data[0].name);
                $("#eSGrade").val(data[0].grade);
                $("#eSBirthday").val(data[0].birthday);
                $("#eSLocation").val(data[0].location); */
            });

            /* $.ajax({
                method: "GET",
                url: "/edit/students/" + id
            })
            .then(function(data){
                console.log(data);
            }); */
        });

    /* 
        When the delete student button is clicked,
        Delete the student from the database
        Update the table
    */
        $(document).on("click", ".deleteStudent", function(event){
            event.preventDefault();

            const id = $(this).attr("data-value").substring(6);

            $.ajax({
                method: "PUT",
                url: "/delete/students/" + id
            });
            
            $("#studentTable").empty();

            $.getJSON('/directory', function(data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    $("#studentTable").append(
                        "<tr>" +
                            "<td>" + data[i].name + "</td>" + 
                            "<td>" + data[i].grade + "</td>" +
                            "<td>" + data[i].birthday + "</td>" +
                            "<td>" + data[i].location + "</td>" +
                            "<td> <button class='btn modal-trigger editStudent' data-value=" + "edit" + data[i]._id + " data-target='editStudentModal'> EDIT </button> </td>" +
                            "<td> <button class='btn deleteStudent' data-value=" + "delete" + data[i]._id + " id='delete'> DELETE </button> </td>" +
                        "</tr>"
                    );
                }
            });
        });

    /* ------------------- JAVASCRIPT FOR BIRTHDAYS TAB ------------------- */

    /* Get current month and display it within the birthdays tab */

    /* Get the current date and current month */
        const currDate = (new Date).getMonth();
        $("#currMonth").text(convertMonth(currDate));
        const monthAbv = convertMonth(currDate).substring(0, 3);

    /* Receive student information that corresponds to the current month and update the table */
        $("#birthdayTable").empty();
        $.getJSON('/birthday/' + monthAbv, function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $("#birthdayTable").append(
                    "<tr>" +
                        "<td>" + data[i].name + "</td>" + 
                        "<td>" + data[i].grade + "</td>" +
                        "<td>" + data[i].birthday + "</td>" +
                        "<td>" + data[i].location + "</td>" +
                    "</tr>"
                );
            }
        });

    /* 
        Change months according to what navigation button was pressed 
        Update the table according to the new month
    */
        $("#lastMonth").on("click", function(){
            var selectedMonth = $("#currMonth").text();
            var finalMonthValue = getCurrMonth(selectedMonth) - 1;
            
            if (finalMonthValue < 0) {
                finalMonthValue = 11;
            }
            $("#currMonth").text(convertMonth(finalMonthValue));
            
            const monthAbv = convertMonth(finalMonthValue).substring(0, 3);
            $("#birthdayTable").empty();

            $.getJSON('/birthday/' + monthAbv, function(data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    $("#birthdayTable").append(
                        "<tr>" +
                            "<td>" + data[i].name + "</td>" + 
                            "<td>" + data[i].grade + "</td>" +
                            "<td>" + data[i].birthday + "</td>" +
                            "<td>" + data[i].location + "</td>" +
                        "</tr>"
                    );
                }
            });
        });
        $("#nextMonth").on("click", function(){
            var selectedMonth = $("#currMonth").text();
            var finalMonthValue = getCurrMonth(selectedMonth) + 1;
            if (finalMonthValue > 11) {
                finalMonthValue = 0;
            }
            $("#currMonth").text(convertMonth(finalMonthValue));
            
            const monthAbv = convertMonth(finalMonthValue).substring(0, 3);
            $("#birthdayTable").empty();

            $.getJSON('/birthday/' + monthAbv, function(data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    $("#birthdayTable").append(
                        "<tr>" +
                            "<td>" + data[i].name + "</td>" + 
                            "<td>" + data[i].grade + "</td>" +
                            "<td>" + data[i].birthday + "</td>" +
                            "<td>" + data[i].location + "</td>" +
                        "</tr>"
                    );
                }
            });
        });

    /* Add Student Modal trigger */
        $('.modal').modal();
    });


    /* Validate fields in the add/editStudent Modal so that the correct values are being entered for students */
    function validateFields(grade, birthday, location){
        const gradeRegex = /([6-9]|1[0-2])[BG]/;
        const birthdayRegex = /((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([0-9]|[0-2][0-9]|3[0-1]),\s([1-2][0|9][0-9][0-9]))|(^$)/;
        const locationRegex = /(.+,\s([A-Z][A-Z]))|(^$)/;
        if (grade.match(gradeRegex) && birthday.match(birthdayRegex) && location.match(locationRegex)){
            return true;
        }
        return false;
    }

    /* Gets the current month and converts it into a string. */
    function convertMonth(monthValue) {
        switch(monthValue) {
            case 0 :
                return "January";
            case 1 :
                return "February";
            case 2 :
                return "March";
            case 3 :
                return "April";
            case 4 :
                return "May";
            case 5 :
                return "June";
            case 6 :
                return "July";
            case 7 :
                return "August";
            case 8 :
                return "September";
            case 9 :
                return "October";
            case 10 :
                return "November";
            case 11 :
                return "December";
        }
    }

    /* Gets the current month string and returns an integer. */
    function getCurrMonth(monthString) {
        switch(monthString) {
            case "January" :
                return 0;
            case "February" :
                return 1;
            case "March" :
                return 2;
            case "April" :
                return 3;
            case "May" :
                return 4;
            case "June" :
                return 5;
            case "July" :
                return 6;
            case "August" :
                return 7;
            case "September" :
                return 8;
            case "October" :
                return 9;
            case "November" :
                return 10;
            case "December" :
                return 11;
        }
    }