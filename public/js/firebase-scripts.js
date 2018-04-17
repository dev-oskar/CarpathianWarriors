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
const clubOutput = document.getElementById('clubsList');
var tempDiv;
var detailsDiv;

getRealtimeUpdates = function() {

  firestore.collection('zawodnicy').get().then(function(querySnapshot) {
    output.innerHTML = "";

    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      var dataSup = doc.data();
      console.log(doc.id, " => ", dataSup);

      tempDiv = document.createElement('div');
      tempDiv.className = "fighter-box";
      tempDiv.setAttribute("onclick", "getFighterDetails(this)");
      tempDiv.dataset.fighterId = doc.id;
      tempDiv.innerHTML += "<p class='fighter-props-identity'>" + dataSup.imie + " " + dataSup.nazwisko + "</p>";
      tempDiv.innerHTML += "<p class='fighter-props'>Waga: " + dataSup.waga + " kg</p>";
      tempDiv.innerHTML += "<p class='fighter-props'>Wzrost: " + dataSup.wzrost + " cm</p>";
      tempDiv.innerHTML += "<p class='fighter-props'>Wiek: " + dataSup.wiek + "</p>";
      tempDiv.innerHTML += "<p class='fighter-props-club'>" + dataSup.przynaleznosc + "</p>"
      tempDiv.style.background = "rgb(34, 34, 34) url('/img/fighters/" + doc.id + ".png')";
      tempDiv.style.backgroundPosition = "30% 10%"
      output.appendChild(tempDiv);
    });
  });
  firestore.collection('kluby').get().then(function(querySnapshot) {
    clubOutput.innerHTML = "";

    querySnapshot.forEach(function(doc){
      var dataSup = doc.data();
      console.log(doc.id, " => ", dataSup);

      tempDiv = document.createElement('div');
      tempDiv.className = "club-box";
      tempDiv.setAttribute("onclick", "getClubDetails(this)");
      tempDiv.dataset.clubId = doc.id;
      tempDiv.innerHTML += "<p class='club-header'>" + dataSup.nazwa + "</p>";
      tempDiv.style.background = "rgb(34, 34, 34) url('/img/clubs/" + doc.id + ".png')";
      tempDiv.style.backgroundPosition = "center";

      clubOutput.appendChild(tempDiv);
    });
  });
}

getRealtimeUpdates();

function sortBy(type) {
  console.clear();
  output.innerHTML = "";

  var selectedSorting = type.getAttribute("data-sort-by");

  firestore.collection('zawodnicy').orderBy(selectedSorting).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var dataSup = doc.data();
      console.log(doc.id, " => ", dataSup);

      tempDiv = document.createElement('div');
      tempDiv.className = "fighter-box";
      tempDiv.setAttribute("onclick", "getFighterDetails(this)");
      tempDiv.dataset.fighterId = doc.id;
      tempDiv.innerHTML += "<p class='fighter-props-identity'>" + dataSup.imie + " " + dataSup.nazwisko + "</p>";
      tempDiv.innerHTML += "<p class='fighter-props'>Waga: " + dataSup.waga + " kg</p>";
      tempDiv.innerHTML += "<p class='fighter-props'>Wzrost: " + dataSup.wzrost + " cm</p>";
      tempDiv.innerHTML += "<p class='fighter-props'>Wiek: " + dataSup.wiek + "</p>";
      tempDiv.innerHTML += "<p class='fighter-props-club'>" + dataSup.przynaleznosc + "</p>";
      tempDiv.style.background = "rgb(34, 34, 34) url('/img/fighters/" + doc.id + ".png')";
      tempDiv.style.backgroundPosition = "30% 10%"
      output.appendChild(tempDiv);
    });
  });
}

function getFighterDetails(fighterId) {

  var selectedFighter = fighterId.getAttribute('data-fighter-id');

  var docRef = firestore.collection('zawodnicy').doc(selectedFighter);
  docRef.get().then(function(doc) {
    var dataSup = doc.data();

    detailsDiv = document.createElement('div');
    detailsDiv.className = 'detail-section';
    detailsDiv.innerHTML += "<span class='close-details' onclick='getRealtimeUpdates()'>X</span</p><br />";
    detailsDiv.innerHTML += "<p class='detail-section-header'>" + dataSup.imie + " " + dataSup.nazwisko + "</p>";
    detailsDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node'>Waga: </span>" + dataSup.waga + " kg</p>";
    detailsDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node'>Wzrost: </span>" + dataSup.wzrost + " cm</p>";
    detailsDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node'>Wiek: </span>" + dataSup.wiek + "</p>";
    detailsDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node'>Klub: </span>" + dataSup.przynaleznosc + "</p>";
    detailsDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node'>Opis: </span>" + dataSup.opis + "</p>";
    detailsDiv.innerHTML += "<img class='detail-section-avatar'" + "src='/img/fighters/" + doc.id + ".png'" + "alt='Zdjęcie zawodnika' />";

    output.innerHTML = "";
    output.appendChild(detailsDiv);
    document.getElementById('sort-by').scrollIntoView();
  })
};

function getClubDetails(clubId) {

  var selectedClub = clubId.getAttribute('data-club-id');

  var docRef = firestore.collection('kluby').doc(selectedClub);
  docRef.get().then(function(doc) {
    var dataSup = doc.data();

    detailsDiv = document.createElement('div');
    detailsDiv.className = 'detail-section';
    detailsDiv.innerHTML += "<span class='close-details' onclick='getRealtimeUpdates()'>X</span</p><br />";
    detailsDiv.innerHTML += "<p class='detail-section-header'>" + dataSup.nazwa + "</p>";
    detailsDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node'>Miejscowość: </span>" + dataSup.miejscowosc + "</p>";
    detailsDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node'>Opis: </span>" + dataSup.opis + "</p>";
    detailsDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node'>Link: </span>" + "<a href='" + dataSup.link + "' target='" + "_blank" + "'>Kliknij tutaj</a></p>";

    clubOutput.innerHTML = "";
    clubOutput.appendChild(detailsDiv);
    document.getElementById('clubs-list').scrollIntoView();
  })
};
