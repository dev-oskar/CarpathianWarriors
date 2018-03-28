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
  var firestore = firebase.firestore();

  const docRef = firestore.doc("zawodnicy/t5eOQHaqpqNPkYUOPzkd");
  const output = document.getElementById('fighter');

  getRealtimeUpdates = function(){
    docRef.onSnapshot(function(doc){
      if (doc && doc.exists){
        const myData = doc.data();
        output.innerHTML = "Imię: " + myData.imie + "<br />" + "Nazwisko: " + myData.nazwisko + "<br />" + " Waga: " + myData.waga + "<br />" + "Wzrost: " + myData.wzrost;
      }
    });
  }

  getRealtimeUpdates();
