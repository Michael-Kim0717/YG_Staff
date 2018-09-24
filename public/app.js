/* home.handlebars */

    /* Access tabs in the home page. */
    $(document).ready(function(){
        $('.tabs').tabs();


    /* ------------------- JAVASCRIPT FOR DIRECTORY TAB ------------------- */
        $('.datepicker').datepicker();

        $(".dropdownGrade").on("click", function(){
            $("#sortDD").text($(this).attr("data-grade"));
        });

        $(".aSGradeV").on("click", function(){
            console.log($(this).attr("data-grade"));
            $("#aSGrade").val($(this).attr("data-grade"));
        });

        $('input.autocomplete').autocomplete({
            data: {
                /* Add More Values Based On What Was Entered Previously */
                "Hackensack, NJ" : null,
                "Teaneck, NJ" : null,
                "Fort Lee, NJ" : null,
                "Fair Lawn, NJ" : null,
                "Garfield, NJ" : null,
                "Englewood, NJ" : null,
                "Bergenfield, NJ" : null,
                "Paramus, NJ" : null,
                "Mahwah, NJ" : null,
                "Ridgewood, NJ" : null,
                "Lodi, NJ" : null,
                "Cliffside Park, NJ" : null,
                "Lyndhurst, NJ" : null,
                "Palisades Park, NJ" : null,
                "Elmwood Park, NJ" : null,
                "Rutherford, NJ" : null,
                "Dumont, NJ" : null,
                "Wyckoff, NJ" : null,
                "New Milford, NJ" : null,
                "North Arlington, NJ" : null,
                "Tenafly, NJ" : null,
                "Ramsey, NJ" : null,
                "Fairview, NJ" : null,
                "Saddle Brook, NJ" : null,
                "Oakland, NJ" : null,
                "Ridgefield Park, NJ" : null,
                "Hasbrouck Heights, NJ" : null,
                "Glen Rock, NJ" : null,
                "Edgewater, NJ" : null,
                "Wayne, NJ" : null
            }
        });

        $("#addStudentButton").on("click", function(){
            $("#aSName").val("");
            $("#aSGrade").val("");
            $("#aSBirthday").val("");
            $("#aSLocation").val("");
        });

        /* Allows the dropdown menus to be triggerable. */
        $('.sort-trigger').dropdown();
        $('.gradepicker').dropdown();

    /* ------------------- JAVASCRIPT FOR BIRTHDAYS TAB ------------------- */

    /* Get current month and display it within the birthdays tab */
        var currDate = (new Date).getMonth();
        $("#currMonth").text(convertMonth(currDate));

    /* Change months according to what navigation button was pressed */
        $("#lastMonth").on("click", function(){
            var selectedMonth = $("#currMonth").text();
            var finalMonthValue = getCurrMonth(selectedMonth) - 1;
            if (finalMonthValue < 0) {
                finalMonthValue = 11;
            }
            $("#currMonth").text(convertMonth(finalMonthValue));
        });
        $("#nextMonth").on("click", function(){
            var selectedMonth = $("#currMonth").text();
            var finalMonthValue = getCurrMonth(selectedMonth) + 1;
            if (finalMonthValue > 11) {
                finalMonthValue = 0;
            }
            $("#currMonth").text(convertMonth(finalMonthValue));
        });

    /* Add Student Modal trigger */
        $('.modal').modal();
    });

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