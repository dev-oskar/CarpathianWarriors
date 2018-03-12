(function() {

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyB1kN2u1tC_GBmK0pi1sTdPYZSrWDpsIxo",
      authDomain: "carpathianwarriorsmma.firebaseapp.com",
      databaseURL: "https://carpathianwarriorsmma.firebaseio.com",
      projectId: "carpathianwarriorsmma",
      storageBucket: "carpathianwarriorsmma.appspot.com",
      messagingSenderId: "24911101713"
    };
    firebase.initializeApp(config);

    // Get elements
    const preObject = document.getElementById('object');

    // Create the references
    const dbRefObject = firebase.database().ref().child('object');

    // Sync object changes
    dbRefObject.on('value', snap => console.log(snap.val()));

}());
