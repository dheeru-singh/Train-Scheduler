var config = {
  apiKey: "AIzaSyDTuKRYmQBn5S_UXowSs8OMWiEEj8XeRe8",
  authDomain: "train-scheduler-ca324.firebaseapp.com",
  databaseURL: "https://train-scheduler-ca324.firebaseio.com",
  projectId: "train-scheduler-ca324",
  storageBucket: "",
  messagingSenderId: "271996220609",
  appId: "1:271996220609:web:dee5ec9fdc950a74"
  };

  firebase.initializeApp(config);
 // console.log(moment("1432", "hmm").format("HH:mm"));
  // Create a variable to reference the database
  var database = firebase.database();

  var trainName = '';
  var destination= '';
  var firstTrain= '';
  var frequency= '';
  var minutesAway= '';

  
  $("#add-train").on("click", function(event) {
    
    // Don't refresh the page!
    event.preventDefault();
     if( $('#train-name').val()!=="" && $('#destination').val()!=="" &&
         $('#train-time').val()!=="" && $('#frequency').val()!==""){
      // Get inputs
      trainName = $('#train-name')
        .val()
        .trim();
      destination = $('#destination')
        .val()
        .trim();
      // trainTime = $('#train-time')
      //   .val()
      //   .trim();
      firstTrain=  moment($("#train-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
     console.log(firstTrain);
      frequency = $('#frequency')
        .val()
        .trim();
      // Change what is saved in firebase
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
     
    // Code in the logic for storing and retrieving the most recent user.

    // Don't forget to provide initial data to your Firebase database.
    });

    alert("New train successfully added");
      
    // clear text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
     }
    else{
      alert("Please Fill all the Input field");
     }
  });

  database.ref(). on("child_added", function(childSnapshot, prevChildKey){
    
    console.log(childSnapshot.val());
    var fireTrainName=childSnapshot.val().trainName;
    var fireDestination= childSnapshot.val().destination;
    var fireFrequency= childSnapshot.val().frequency;
    var fireFirstTrain= childSnapshot.val().firstTrain;
 
   // var differenceTimes = moment().diff(moment.unix(fireFirstTrain), "minutes");
    var remainder = moment().diff(moment.unix(fireFirstTrain), "minutes") % fireFrequency ;
    var minutes = fireFrequency - remainder;

    var arrival = moment().add(minutes, "m").format("hh:mm A"); 
    console.log(minutes);
    console.log(arrival);

    console.log(moment().format("hh:mm A"));
    console.log(arrival);
    console.log(moment().format("X"));

      $("#train-schedules").append(
        "<tr><td>" +  fireTrainName+
        "</td><td>" + fireDestination +
        "</td><td>" + fireFrequency +
        "</td><td>" + arrival +  
        "</td><td>" + minutes + 
        "</td><td>" +"<button type='button' class='btn btn-danger remove-btn'>Remove" + 
         "</td>");
      
      // If any errors are experienced, log them to console.
    },
    function(errorObject) {
      console.log('The read failed: ' + errorObject.code);
    },
  );


  $("#train-schedules").on('click', '.remove-btn', function(){
     $(this).closest('tr').remove();
  });