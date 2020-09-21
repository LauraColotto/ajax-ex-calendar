$(document).ready(function(){


// Data iniziale calendario

  var data = "2018-01-01";
  var momentData = moment(data);


// Imposto gli eventi Click


  // Tasto precedente

  $("#prev").click(function(){
    if (momentData.month() > 0) {
      $("#days").text("");

      data = momentData.subtract(1, "months");
      console.log(data.format("M"));
      momentData = moment(data);
      stampoGiorni();
    } else {
      alert("E' finito il calendario");
    }

  });

  // Tasto successivo

  $("#succ").click(function(){
    if (momentData.month() < 11) {
      $("#days").text("");

      data = momentData.add(1, "months");
      console.log(data.format("M"));
      momentData = moment(data);
      stampoGiorni();
    } else {
      alert("E' finito il calendario");
    }

  });



// -------------------------------------------------------

// Template del calendario

  var source = $("#calendar-template").html();
  var template = Handlebars.compile(source);
  stampoGiorni();

// Stampo i giorni del calendario attraverso una funzione

  function stampoGiorni(){

    // Stampo il mese corrente
    $("h1").text(momentData.format("MMMM YYYY"));


    // Stampo i giorni del calendario in una lista ordinata

    for (var i = 1; i <= moment(data).daysInMonth(); i++ ){

      var context = {
        "day": i,
        "month": momentData.format("MMMM"),
        "dateComplete": momentData.format("YYYY-MM-DD"),
      };

      var html = template(context);
      $("#days").append(html);
      momentData.add(1, "day");
    }
    momentData = moment(data);

    // Richiamo l'url ajax

    $.ajax(
      {
         "url": "https://flynn.boolean.careers/exercises/api/holidays?",
         "data": {
           "year": 2018,
           "month": moment(data).month()
         },
          "method": "GET",
          "success": function(data){
            // Prendo i dati per i giorni di festa
            printHoly(data.response);

          },
          "error": function(err){
            alert("Errore");
          },
        }
    )
  };

});


// Funzione di stampo dei giorni di festa

function printHoly(holidays) {
  for (var i = 0; i < holidays.length; i++) {
    console.log(holidays[i].date);


    // Richiamo le chiavi dei giorni di festa e dei nomi delle festività

    var holiDate = holidays[i].date;
    var holiName = holidays[i].name;

    // Li inserisco nell'html

    $(".day[data-giorno='"+holiDate+"']").addClass("holy");
    $(".day[data-giorno='"+holiDate+"'] span").text(" - " + holiName);

  }
};
