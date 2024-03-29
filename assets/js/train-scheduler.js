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
    //check if any input field is not empty
     if( $('#train-name').val()!=="" && $('#destination').val()!=="" &&
         $('#train-time').val()!=="" && $('#frequency').val()!==""){
      // Get inputs from the form field
      trainName = $('#train-name').val().trim();
      destination = $('#destination').val().trim();
      firstTrain=  moment($("#train-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
      frequency = $('#frequency').val().trim();
     
      // Change what is saved in firebase
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    
    });
    //alert message when new train is sussesfully added
    alert("New train successfully added");
      
    // when new train is successfully added then clear text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
     }
    else{
      //alert message when user submit the form without entering the input field
      alert("Please Fill all the Input field");
     }
  });

  //when the new train added successfully then retriving the data from the database
  database.ref(). on("child_added", function(childSnapshot, prevChildKey){
    
    // console.log(childSnapshot.val());
    var fireTrainName=childSnapshot.val().trainName;
    var fireDestination= childSnapshot.val().destination;
    var fireFrequency= childSnapshot.val().frequency;
    var fireFirstTrain= childSnapshot.val().firstTrain;
 
    var differenceTimes = moment().diff(moment.unix(fireFirstTrain), "minutes");
    var remainder = moment().diff(moment.unix(fireFirstTrain), "minutes") % fireFrequency ;
    //calculating the minutes away
    var minutes = fireFrequency - remainder;
    //calculating the next arrival
    var arrival = moment().add(minutes, "m").format("hh:mm A"); 
    // console.log(minutes);
    // console.log(arrival);
    // console.log(moment().format("hh:mm A"));
    // console.log(arrival);
    // console.log(moment().format("X"));

      $("#train-schedules").append(
        "<tr><td>" +  fireTrainName+
        "</td><td>" + fireDestination +
        "</td><td>" + fireFrequency +
        "</td><td>" + arrival +  
        "</td><td>" + minutes + 
        "</td>");
      
        // <td>" +"<button type='button' class='btn btn-danger remove-btn'>Remove" + 
        //  "</td>

    // If any errors are experienced, log them to console.
    },
    function(errorObject) {
      console.log('The read failed: ' + errorObject.code);
    },
  );



//   $("#train-schedules").on('click', '.remove-btn', function(event){
//     $(this).closest('tr').remove();
  
//    //console.log(database.collection('train-scheduler-ca324').doc("destination"));
//    // ref.child(key).remove();
  
//     database.ref(). on("child_removed", function(childSnapshot, prevChildKey){
//      console.log(childSnapshot);

     
//     });
//  });

