// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDoxwgiLQwFUG_jAWOnWb7JlIiEO8mnEl8",
    authDomain: "project-example-43b6c.firebaseapp.com",
    databaseURL: "https://project-example-43b6c.firebaseio.com",
    projectId: "project-example-43b6c",
    storageBucket: "project-example-43b6c.appspot.com",
    messagingSenderId: "200282003284",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//create a variable to reference the database
var database = firebase.database();

//on click function for the submit button
$("#add-train").on("click", function (event) {
    event.preventDefault();

    // Code in the logic for storing and retrieving the most recent user.
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var trainTime = $("#train-time").val().trim();
    var trainFrequency = $("#train-frequency").val().trim()

    // Change what is saved in firebase
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
    }

    // Don't forget to provide initial data to your Firebase database.
    database.ref().push(newTrain);

    // Clear the form after values have been stored
    $("#train-name").text(name);
    $("#train-destination").text(destination);
    $("#train-time").text(time);
    $("#train-frequency").text(frequency);
});

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function (childSnapshot) {
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    // Add the data into the HTML
    $("#train-info > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});