// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDoxwgiLQwFUG_jAWOnWb7JlIiEO8mnEl8",
    authDomain: "project-example-43b6c.firebaseapp.com",
    databaseURL: "https://project-example-43b6c.firebaseio.com",
    projectId: "project-example-43b6c",
    storageBucket: "project-example-43b6c.appspot.com",
    messagingSenderId: "200282003284",
    appId: "1:200282003284:web:ae9131a3d11fadceb5dac1",
    measurementId: "G-72F0ZMRP72"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//create a variable to reference the database
var database = firebase.database();

//on click function for the submit button
$(".btn-submit").on("click", function (event) {
    event.preventDefault();
    console.log("clicked");

    // YOUR TASK!!!

    // Code in the logic for storing and retrieving the most recent user.
    // Get inputs
    var name = $("#train-name").val().trim();
    var destination = $("#train-destination").val().trim();
    var time = $("#train-time").val().trim();
    var frequency = $("#train-frequency").val().trim();
    // Don't forget to provide initial data to your Firebase database.

    // Change what is saved in firebase
    database.ref().set({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
    });
    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function (snapshot) {
        var name = snapshot.val().name
        var destination = snapshot.val().role
        var time = snapshot.val().time
        var frequency = snapshot.val().frequency

        $("#train-name").text(name);
        $("#train-destination").text(destination);
        $("#train-time").text(time);
        $("#train-frequency").text(frequency);
    });
});