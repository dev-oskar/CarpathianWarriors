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
  const output = document.getElementById('fightersList');
  var fighters = [];
  var tempDiv;

  getRealtimeUpdates = function(){
        firestore.collection("zawodnicy").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var dataSup = doc.data()
            console.log(doc.id, " => ", dataSup);

            // Get data and push it into the array.
            fighters.push(dataSup.imie)
        });
    });
    console.log(fighters) //TODO: Only for tests. Won't show it in final version
  }

  getRealtimeUpdates();

  function loadFighters(item, index){
    tempDiv = document.createElement('div');
    tempDiv.className = "fighterBox";
    tempDiv.id = index + "-" + item;
    tempDiv.innerHTML = item;
    output.appendChild(tempDiv);
  }
