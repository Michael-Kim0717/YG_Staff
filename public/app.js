/* home.handlebars */

    /* Access tabs in the home page. */
    $(document).ready(function(){
        $('.tabs').tabs();

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
        
    /* Allows the sorting dropdown menu to be triggerable. */
        $('.sort-trigger').dropdown();

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