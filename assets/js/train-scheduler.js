var trainArray = JSON.parse(localStorage.getItem('train-list'));

if (Array.isArray(trainArray) === false) {
    trainArray = [];
}
printTrainArray(trainArray);

function printTrainArray(arr) {
  $('#train-schedules').empty();
  for (var i = 0; i < arr.length; i++) {
    var trainItem=$('<td>');
    trainItem.append("<div id='item-'" + i+ ">"+arr[i]);
   $('#train-schedules').append(trainItem);
  }
}
//  On Click event associated with the add-train function
$('#add-train').on('click', function(event) {
  event.preventDefault();

  var trainName = $('#train-name').val().trim();
  var destination= $('#destination').val().trim();
  var trainTime= $('#train-time').val().trim();
  var frequency= $('#frequency').val().trim();
  var minutesAway=10;
  trainArray.push(trainName, destination, frequency, trainTime, minutesAway);
  localStorage.setItem('train-list', JSON.stringify(trainArray));
  printTrainArray(trainArray);
  $('#train-name').val('');
  $('#destination').val('');
  $('#train-time').val('');
  $('#frequency').val('');
  $('#minutesAway').val('');
});

