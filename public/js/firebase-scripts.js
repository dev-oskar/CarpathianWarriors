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

  const output = document.getElementById('fightersList');
  var tempDiv;

  getRealtimeUpdates = function(){
        firestore.collection('zawodnicy').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var dataSup = doc.data();
            console.log(doc.id, " => ", dataSup);

            tempDiv = document.createElement('div');
            tempDiv.className = "fighter-box";
            tempDiv.id = doc.id;
            tempDiv.innerHTML = "<p class='fighter-props-identity'>" + dataSup.imie + " " + dataSup.nazwisko + "</p>";
            tempDiv.innerHTML += "<p class='fighter-props'>Waga: " + dataSup.waga + " kg</p>";
            tempDiv.innerHTML += "<p class='fighter-props'>Wzrost: " + dataSup.wzrost + " cm</p>";
            tempDiv.innerHTML += "<p class='fighter-props'>Wiek: " + dataSup.wiek + "</p>";
            tempDiv.innerHTML += "<p class='fighter-props-club'>" + dataSup.przynaleznosc + "</p>"
            tempDiv.style.background = "#505050 url('/img/fighters/" + doc.id + ".png')";
            tempDiv.style.backgroundPosition = "30% 10%"
            output.appendChild(tempDiv);
        });
    });
  }

  getRealtimeUpdates();

  function sortBy(type){
    console.clear();
    output.innerHTML = "";

    var selectedSorting = type.getAttribute("data-sort-by");

    firestore.collection('zawodnicy').orderBy(selectedSorting).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          var dataSup = doc.data();
          console.log(doc.id, " => ", dataSup);

          tempDiv = document.createElement('div');
          tempDiv.className = "fighter-box";
          tempDiv.id = doc.id;
          tempDiv.innerHTML = "<p class='fighter-props-identity'>" + dataSup.imie + " " + dataSup.nazwisko + "</p>";
          tempDiv.innerHTML += "<p class='fighter-props'>Waga: " + dataSup.waga + " kg</p>";
          tempDiv.innerHTML += "<p class='fighter-props'>Wzrost: " + dataSup.wzrost + " cm</p>";
          tempDiv.innerHTML += "<p class='fighter-props'>Wiek: " + dataSup.wiek + "</p>";
          tempDiv.innerHTML += "<p class='fighter-props-club'>" + dataSup.przynaleznosc + "</p>";
          tempDiv.style.background = "#505050 url('/img/fighters/" + doc.id + ".png')";
          tempDiv.style.backgroundPosition = "30% 10%"
          output.appendChild(tempDiv);
    });
});
  }
