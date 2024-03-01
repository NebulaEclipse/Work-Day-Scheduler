$(function () {
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).parent().attr("id");
    var userInput = $(this).siblings("textarea").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply past, present, or future classes
  var currentHour = dayjs().hour();
  var timeBlocks = $(".time-block");

  for (var i = 0; i < timeBlocks.length; i++) {
    var id = timeBlocks.eq(i).attr("id");
    var blockHour = parseInt(id); // Parse the hour to integer
    
    // Apply classes based on the comparison of current hour and block hour
    if (blockHour === currentHour) {
      timeBlocks.eq(i).addClass("present").removeClass("past future");
    } else if (blockHour > currentHour) {
      timeBlocks.eq(i).addClass("past").removeClass("present future");
    } else {
      timeBlocks.eq(i).addClass("future").removeClass("present past");
    }
  }

  // Get any user input saved in localStorage and set the values of corresponding textarea elements
  $(".time-block").each(function () {
    var blockId = $(this).attr("id");
    var savedInput = localStorage.getItem(blockId);
    if (savedInput !== null) {
      $(this).find("textarea").val(savedInput);
    }
  });

  // Displays current date in the header of the page
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});