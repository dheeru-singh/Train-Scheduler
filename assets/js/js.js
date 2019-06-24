var toDoArr = JSON.parse(localStorage.getItem('to-do-list'));

if (Array.isArray(toDoArr) === false) {
  toDoArr = [];
}
printTodo(toDoArr);

function printTodo(arr) {
  $('#to-dos').empty();
  for (var i = 0; i < arr.length; i++) {
    var toDoItem = $('<p>');

    toDoItem.attr('id', 'item-' + i);
    toDoItem.text(arr[i]);

    var toDoClose = $('<button>');

    toDoClose.attr('data-to-do', i);
    toDoClose.addClass('checkbox');
    toDoClose.text('✓');

    // Append the button to the to do item
    toDoItem = toDoItem.prepend(toDoClose);

    // Add the button and to do item to the to-dos div
    $('#to-dos').append(toDoItem);
  }
}
//  On Click event associated with the add-to-do function
$('#add-to-do').on('click', function(event) {
  event.preventDefault();

  var toDoTask = $('#to-do')
    .val()
    .trim();
  toDoArr.push(toDoTask);
  localStorage.setItem('to-do-list', JSON.stringify(toDoArr));
  printTodo(toDoArr);
  $('#to-do').val('');
});

// When a user clicks a check box then delete the specific content
// (NOTE: Pay attention to the unusual syntax here for the click event.
// Because we are creating click events on "dynamic" content, we can't just use the usual "on" "click" syntax.)
$(document.body).on('click', '.checkbox', function() {
  // Get the number of the button from its data attribute and hold in a variable called  toDoNumber.
  var toDoNumber = $(this).attr('data-to-do');

  // Select and Remove the specific <p> element that previously held the to do item number.
  toDoArr.splice(toDoNumber, 1);
  printTodo(toDoArr);
  localStorage.setItem('to-do-list', JSON.stringify(toDoArr));
});