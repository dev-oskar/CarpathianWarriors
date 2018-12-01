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
const fightsOutput = document.getElementById('fights');
const partnersOutput = document.getElementById('partnersList');
var tempDiv;
var detailsDiv;

getRealtimeUpdates = function() {

  firestore.collection('zawodnicy').get().then(function(querySnapshot) {
    output.innerHTML = "";

    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      var dataSup = doc.data();

      tempDiv = document.createElement('div');
      tempDiv.className = "fighter-box";
      tempDiv.setAttribute("onclick", "getFighterDetails(this)");
      tempDiv.dataset.fighterId = doc.id;
      tempDiv.innerHTML += "<p class='fighter-props-identity'>" + dataSup.imie + " " + dataSup.nazwisko + "</p>";
      tempDiv.innerHTML += "<p class='fighter-props'>Waga: " + dataSup.waga + " kg</p>";
      tempDiv.innerHTML += "<p class='fighter-props'>Wzrost: " + dataSup.wzrost + " cm</p>";
      tempDiv.innerHTML += "<p class='fighter-props'>Wiek: " + dataSup.wiek + "</p>";
      tempDiv.innerHTML += "<p class='fighter-props-club'>" + dataSup.przynaleznosc + "</p>"
      tempDiv.style.background = "rgb(34, 34, 34) url('/img/zawodnicy/" + doc.id + ".png')";
      tempDiv.style.backgroundPosition = "30% 10%"
      output.appendChild(tempDiv);
    });
  });
  firestore.collection('kluby').get().then(function(querySnapshot) {
    if (!clubOutput){
      clubOutput.innerHTML = "";
    }
    querySnapshot.forEach(function(doc){
      var dataSup = doc.data();

      tempDiv = document.createElement('div');
      tempDiv.className = "club-box";
      tempDiv.setAttribute("onclick", "getClubDetails(this)");
      tempDiv.dataset.clubId = doc.id;
      tempDiv.innerHTML += "<p class='club-header'>" + dataSup.nazwa + "</p>";
      tempDiv.style.background = "rgb(34, 34, 34) url('/img/kluby/" + doc.id + ".png')";
      tempDiv.style.backgroundPosition = "center";

      clubOutput.appendChild(tempDiv);
    });
  });
  firestore.collection('walki').orderBy("rodzajwalki").get().then(function(querySnapshot) {
    fightsOutput.innerHTML = "";

    querySnapshot.forEach(function(doc){
      var dataSup = doc.data();

      tempDiv = document.createElement('div');
      tempDiv.className = "fight-box";
      tempDiv.setAttribute("onclick", "getFightDetails(this)");
      tempDiv.dataset.fightId = doc.id;
      tempDiv.innerHTML += "<span class='fighter-one'>" + dataSup.uczestnicy.zawodnik1 + "</span>";
      tempDiv.innerHTML += "<span class='against-sign'>VS</span>";
      tempDiv.innerHTML += "<span class='fighter-two'>" + dataSup.uczestnicy.zawodnik2 + "</span>";

      fightsOutput.appendChild(tempDiv);
    })
  });
  firestore.collection('partnerzy').get().then(function(querySnapshot) {
    partnersOutput.innerHTML = "";

    querySnapshot.forEach(function(doc){
      var dataSup = doc.data();

      tempDiv = document.createElement('div');
      tempDiv.className = "club-box";
      tempDiv.setAttribute("onclick", "getPartnerDetails(this)");
      tempDiv.dataset.partnerId = doc.id;
      tempDiv.innerHTML += "<p class='club-header'>" + dataSup.nazwa + "</p>";
      tempDiv.style.background = "rgb(34, 34, 34) url('/img/partnerzy/" + doc.id + ".png')";
      tempDiv.style.backgroundPosition = "cover";

      partnersOutput.appendChild(tempDiv);
    })
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
      (doc.id, " => ", dataSup);

      tempDiv = document.createElement('div');
      tempDiv.className = "fighter-box";
      tempDiv.setAttribute("onclick", "getFighterDetails(this)");
      tempDiv.dataset.fighterId = doc.id;
      tempDiv.innerHTML += "<p class='fighter-props-identity'>" + dataSup.imie + " " + dataSup.nazwisko + "</p>";
      tempDiv.innerHTML += "<p class='fighter-props'>Waga: " + dataSup.waga + " kg</p>";
      tempDiv.innerHTML += "<p class='fighter-props'>Wzrost: " + dataSup.wzrost + " cm</p>";
      tempDiv.innerHTML += "<p class='fighter-props'>Wiek: " + dataSup.wiek + "</p>";
      tempDiv.innerHTML += "<p class='fighter-props-club'>" + dataSup.przynaleznosc + "</p>";
      tempDiv.style.background = "rgb(34, 34, 34) url('/img/zawodnicy/" + doc.id + ".png')";
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
    detailsDiv.innerHTML += "<img class='detail-section-avatar'" + "src='/img/zawodnicy/" + doc.id + ".png'" + "alt='Zdjęcie zawodnika' />";

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

function getPartnerDetails(partnerId) {
  var selectedPartner = partnerId.getAttribute('data-partner-id');

  var docRef = firestore.collection('partnerzy').doc(selectedPartner);
  docRef.get().then(function(doc) {
    var dataSup = doc.data();

    detailsDiv = document.createElement('div');
    detailsDiv.className = 'detail-section';
    detailsDiv.innerHTML += "<span class='close-details' onclick='getRealtimeUpdates()'>X</span</p><br />";
    detailsDiv.innerHTML += "<p class='detail-section-header'>" + dataSup.nazwa + "</p>";
    detailsDiv.innerHTML += "<p class='detail-section-text partners'><span class='detail-section-node'>Link: </span>" + "<a href='" + dataSup.link + "' target='" + "_blank" + "'>Kliknij tutaj</a></p>";
    detailsDiv.innerHTML += "<p class='detail-section-text partners'>" + dataSup.opis + "</p>";

    partnersOutput.innerHTML = "";
    partnersOutput.appendChild(detailsDiv);
  })
};

function getFightDetails(fightId) {
  // Wybrana walka
  var selectedFight = fightId.getAttribute('data-fight-id');

  // Odniesienie do kolekcji firestore walki
  var docRef = firestore.collection('walki').doc(selectedFight);
  docRef.get().then(function(doc){
    // Inicijalizacja zmiennych
    var dataSup = doc.data();
    // format id = "imie-nazwisko"
    var fighterOne = dataSup.uczestnicy.zawodnik1id;
    var fighterTwo = dataSup.uczestnicy.zawodnik2id;
    // Odniesienie do firestore
    var fighterOneSup = firestore.collection('zawodnicy').doc(fighterOne);
    var fighterTwoSup = firestore.collection('zawodnicy').doc(fighterTwo);

    // Wyswietlenie div'a z zawodnikiem oraz dodaj portrzebne metody
    detailsDiv = document.createElement('div');
    detailsDiv.className = 'detail-section';
    detailsDiv.innerHTML += "<span class='close-details' onclick='getRealtimeUpdates()'>X</span</p><br />";

    // Odniesienie do pierwszego zawodnika
    fighterOneSup.get().then(function(doc){
      //  Inicjalizacja zmiennych
      var fighterOneName = doc.data().imie + " " + doc.data().nazwisko;
      var tempDiv = document.createElement('div');
      // CSS 
      tempDiv.className = 'fighterOneBox';
      tempDiv.style.background = "rgb(34, 34, 34) url('/img/zawodnicy/" + doc.id + ".png')";
      tempDiv.style.backgroundPosition = "30% 10%"
      // Wyswietlenie podstawowych informacji o zawodniku
      tempDiv.innerHTML += "<p class='detail-section-header' style='line-height: normal;'>" + fighterOneName + "</p>";
      tempDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node'>Waga: </span>" + doc.data().waga + " kg</p>";
      tempDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node'>Wzrost: </span>" + doc.data().wzrost + " cm</p>";
      tempDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node'>Wiek: </span>" + doc.data().wiek + "</p>";
      tempDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node' style='line-height: normal;'>Klub: </span>" + doc.data().przynaleznosc + "</p>";
      // Dodanie zawodnika (child) do okna (parent) 
      detailsDiv.innerHTML += "<p class='against-sign-fight'>VS.</p>"
      detailsDiv.appendChild(tempDiv);
    });

    // Odniesienie do drugiego zawodnika
    fighterTwoSup.get().then(function(doc){
      //  Inicjalizacja zmiennych
      var fighterTwoName = doc.data().imie + " " + doc.data().nazwisko;
      var tempDiv = document.createElement('div');
      // CSS
      tempDiv.className = 'fighterTwoBox';
      tempDiv.style.background = "rgb(34, 34, 34) url('/img/zawodnicy/" + doc.id + ".png')";
      tempDiv.style.backgroundPosition = "30% 10%"
      // Wyswietlenie podstawowych informacji o zawodniku
      tempDiv.innerHTML += "<p class='detail-section-header' style='line-height: normal;'>" + fighterTwoName + "</p>";
      tempDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node'>Waga: </span>" + doc.data().waga + " kg</p>";
      tempDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node'>Wzrost: </span>" + doc.data().wzrost + " cm</p>";
      tempDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node'>Wiek: </span>" + doc.data().wiek + "</p>";
      tempDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node' style='line-height: normal;'>Klub: </span>" + doc.data().przynaleznosc + "</p>";
      // Dodanie zawodnika (child) do okna (parent) 
      detailsDiv.appendChild(tempDiv);
    });

    detailsDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node' style='color: red;'>" + dataSup.rodzajwalki + "</span>"
    detailsDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node'>Data walki: </span>" + dataSup.data + "</p>";
    detailsDiv.innerHTML += "<p class='detail-section-text'><span class='detail-section-node'>Opis: </span>" + dataSup.opis + "</p>";

    fightsOutput.innerHTML = "";
    fightsOutput.appendChild(detailsDiv);
    document.getElementById('fights-list').scrollIntoView();
  });
}
