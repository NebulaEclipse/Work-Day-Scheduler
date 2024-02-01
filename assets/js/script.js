$(function () {
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).parent().attr("id");
    var userInput = $(this).siblings("textarea").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply past, present, or future classes
  var currentHour = dayjs().hour();
  $(".time-block").each(function () {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past");
      $(this).addClass("present");
    } else {
      $(this).removeClass("past");
      $(this).removeClass("present");
      $(this).addClass("future");
    }
  });

  // Get any user input saved in localStorage and set the values of corresponding textarea elements
  $(".time-block").each(function () {
    var blockId = $(this).attr("id");
    var savedInput = localStorage.getItem(blockId);
    if (savedInput !== null) {
      $(this).find("textarea").val(savedInput);
    }
  });

  // Display the current date in the header of the page
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});