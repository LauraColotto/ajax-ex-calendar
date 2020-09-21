$(document).ready(function(){

// Data iniziale calendario

  var data = "2018-01-01";
  var momentData = moment(data);


// Template del calendario

  var source = $("#calendar-template").html();
  var template = Handlebars.compile(source);


// Stampo i giorni del calendario
  for (var i = 1; i <= momentData.daysInMonth(); i++ ){


    var context = {
      "Mese": "",
      "day": i,
      "month": momentData.format("MMMM"),
      "dateComplete": momentData.format("YYYY-MM-DD"),
    };

    var html = template(context);
    $("#days").append(html);
    momentData.add(1, "day");
  }


  $.ajax(
    {
       "url": "https://flynn.boolean.careers/exercises/api/holidays?",
       "data": {
         "year": 2018,
         "month": 0
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
