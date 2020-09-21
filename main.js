$(document).ready(function(){


// Data iniziale calendario

  var data = "2018-02-01";
  var momentData = moment(data);


  // $("#prev").click(function(){
  //   if (momentData.month() > 0) {
  //     $("#days").text("");
  //
  //     var mese = momentData.format("M") - 1;
  //     if (mese < 10) mese = "0"+mese;
  //     var newDate = momentData.format("YYYY") + "-" + mese + "-" +
  //     momentData.format("01");
  //     console.log(newDate);
  //     data = newDate;
  //     momentData = moment(data);
  //     stampoGiorni();
  //   } else {
  //     alert("E' finito il calendario");
  //   }
  //
  // });


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



// Template del calendario

  var source = $("#calendar-template").html();
  var template = Handlebars.compile(source);
  stampoGiorni();

// Stampo i giorni del calendario

  function stampoGiorni(){

    // Stampo il mese corrente
    $("h1").text(momentData.format("MMMM YYYY"));

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
    $.ajax(
      {
         "url": "https://flynn.boolean.careers/exercises/api/holidays?",
         "data": {
           "year": 2018,
           "month": moment(data).month()
         },
          "method": "GET",
          "success": function(data){
            printHoly(data.response);

          },
          "error": function(err){
            alert("Errore");
          },
        }
    )
  };

});


function printHoly(holidays) {
  for (var i = 0; i < holidays.length; i++) {
    console.log(holidays[i].date);

    var holiDate = holidays[i].date;
    var holiName = holidays[i].name;

    $(".day[data-giorno='"+holiDate+"']").addClass("holy");
    $(".day[data-giorno='"+holiDate+"'] span").text(" - " + holiName);

  }
}

// Evento click per i tasti avanti e indietro
