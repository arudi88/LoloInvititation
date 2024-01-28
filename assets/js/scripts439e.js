// Portada parallax
$(".parallax-portada").parallax({
  imageSrc: "assets/img/portada.jpg",
});

// ----------------------

// Cuenta Regresiva:

// Set the date we're counting down to
var countDownDate = new Date(fechaCuentaRegresiva).getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("reloj").innerHTML =
    days + " días, " + hours + " hs, " + minutes + " m, " + seconds + " s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("reloj").innerHTML = "¡Llegó el gran día!";
    $("#reloj").prev("p").html("Listo...");
  }
}, 1000);

// ----------------------

// musica

var audios = document.getElementById("audioPrueba");


var playAudio = () => {
  audios.play().catch((error) => {
    console.log(
      "La reproducción automática no está permitida. Haz clic en la página para reproducir el audio."
    );
    return false;
  });
  $("#btnPlay").addClass("hidden");
  $("#btnPausa").removeClass("hidden");
  $("#btnPausa").addClass("pulse");
};

var pauseAudio = () => {
  audios.pause();
  $("#btnPausa").addClass("hidden");
  $("#btnPlay").removeClass("hidden");
  $("#btnPlay").addClass("vertical_shake");
};



// ----------------------

// Agendar en calendarios

var calendarios = () => {
  formatGoogleCalendarLink(fechaInicioEvento, fechaFinEvento);
  formatMicrosoftOfficeCalendarLink(fechaInicioEvento, fechaFinEvento);
  formatOutlookCalendarLink(fechaInicioEvento, fechaFinEvento);
  formatAppleCalendarLink(fechaInicioEvento, fechaFinEvento);
  formatYahooCalendarLink(fechaInicioEvento, fechaFinEvento);
};

function formatDateToISO8601(inputDate) {
  const date = new Date(inputDate);
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}

function formatDateToICS(inputDate, zona) {
  const date = new Date(inputDate);
  zona ? date.setHours(date.getHours() - 3) : null;
  const formattedDate = date
    .toISOString()
    .replace(/[:-]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
  return formattedDate;
}

function formatGoogleCalendarLink(startDate, endDate) {
  const formattedStartDate = formatDateToICS(startDate);
  const formattedEndDate = formatDateToICS(endDate);
  const formattedTituloEvento = encodeURIComponent(tituloEvento);
  $("#LinkCalendarGoogle").attr(
    "href",
    `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${formattedStartDate}%2F${formattedEndDate}&text=${formattedTituloEvento}&text=${formattedTituloEvento}`
  );
}

function formatOutlookCalendarLink(startDate, endDate) {
  const formattedStartDate = encodeURIComponent(formatDateToISO8601(startDate));
  const formattedEndDate = encodeURIComponent(formatDateToISO8601(endDate));
  const formattedTituloEvento = encodeURIComponent(tituloEvento);
  $("#LinkCalendarOutlook").attr(
    "href",
    `https://outlook.live.com/calendar/0/action/compose?allday=false&enddt=${formattedEndDate}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${formattedStartDate}&subject=${formattedTituloEvento}`
  );
}

function formatMicrosoftOfficeCalendarLink(startDate, endDate) {
  const formattedStartDate = encodeURIComponent(formatDateToISO8601(startDate));
  const formattedEndDate = encodeURIComponent(formatDateToISO8601(endDate));
  const formattedTituloEvento = encodeURIComponent(tituloEvento);
  $("#LinkCalendarMicrosoft365").attr(
    "href",
    `https://outlook.office.com/calendar/action/compose?allday=false&enddt=${formattedEndDate}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${formattedStartDate}&subject=${formattedTituloEvento}`
  );
}

function formatAppleCalendarLink(startDate, endDate) {
  const formattedStartDate = formatDateToICS(startDate);
  const formattedEndDate = formatDateToICS(endDate);
  const formattedTituloEvento = encodeURIComponent(tituloEvento).replace(
    /%20/g,
    " "
  );
  $("#LinkCalendarApple").attr(
    "href",
    `data:text/calendar;charset=utf-8,${encodeURIComponent(
      `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:Evento\nDTSTART:${formattedStartDate}\nDTEND:${formattedEndDate}\nSUMMARY:${formattedTituloEvento}\nEND:VEVENT\nEND:VCALENDAR`
    )}`
  );
}

function formatYahooCalendarLink(startDate, endDate) {
  const formattedStartDate = formatDateToICS(startDate, true);
  const formattedEndDate = formatDateToICS(endDate, true);
  const formattedTituloEvento = encodeURIComponent(tituloEvento);
  $("#LinkCalendarYahoo").attr(
    "href",
    `https://calendar.yahoo.com/?dur=&et=${formattedEndDate}&st=${formattedStartDate}&title=${formattedTituloEvento}&v=60`
  );
}
// ----------------------

// EJECUCIONES AUTOMATICAS

calendarios();

// ----------------------
