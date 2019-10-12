// Load document ready function
$(document).ready(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyAS4X10BXV0Okw_iDAd7kVrpfCKKjdgmJg",
        authDomain: "train-scheduler-56b12.firebaseapp.com",
        databaseURL: "https://train-scheduler-56b12.firebaseio.com",
        projectId: "train-scheduler-56b12",
        storageBucket: "train-scheduler-56b12.appspot.com",
        messagingSenderId: "1092551141428",
        appId: "1:1092551141428:web:09b329ac3e37a04e9d4261",
        measurementId: "G-3HCLT5D340"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    //Create a variable to reference the database
    var database = firebase.database();

    //on click function for the submit button
    $("#add-train").on("click", function (event) {
        event.preventDefault();

        // Code in the logic for storing and retrieving the most recent user.
        var trainName = $("#train-name").val().trim();
        var trainDestination = $("#train-destination").val().trim();
        var trainTime = $("#train-time").val().trim();
        var trainFrequency = $("#train-frequency").val().trim()

        // Don't forget to provide initial data to your Firebase database.
        database.ref().push({

            // Change what is saved in firebase
            name: trainName,
            destination: trainDestination,
            time: trainTime,
            frequency: trainFrequency,
        });

        // Clear the form after values have been stored
        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-time").val("");
        $("#train-frequency").val("");
    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function (childSnapshot) {

        // Store snapshot variables
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().time;
        var trainFrequency = childSnapshot.val().frequency;

        // Processing time schedule for each train
        var trainTimeConverter = moment(trainTime, "hh:mm").subtract(1, "years");
        var timeDifference = moment().diff(moment(trainTimeConverter), "minutes");
        var timeLeft = timeDifference % trainFrequency;
        var minutesAway = trainFrequency - timeLeft;
        var nextArrival = moment().add(minutesAway, "minutes")
        nextArrival = moment.format("hh:mm");

        // Add the data into the HTML
        $("#train-info > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
    });
});