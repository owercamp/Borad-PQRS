function onSelectionChange(e: any) {
  let spreadsheet = e.source;
  let range = e.range;
  let column = range.getColumn();
  let row = range.getRow();
  let my_value = spreadsheet.getActiveSheet().getRange(row, column).getValue();

  const hour = datatime(new Date());

  if ((column == 2 || column == 14) && row > 3 && my_value == "") {
    spreadsheet.getActiveSheet().getRange(row, column).setValue(hour);
    spreadsheet.getActiveSheet().getRange(row, column)
      .setVerticalAlignment('middle')
      .setHorizontalAlignment('center')
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  }
}

function datatime(info: any) {
  const date_hour: string = Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(info);

  return date_hour;
}

function holidays_co() {
  let year: number = new Date().getFullYear();
  let url: string = `https://date.nager.at/api/v3/publicholidays/${year}/CO`;

  let request = UrlFetchApp.fetch(url);
  let response = JSON.parse(request.getContentText());
  return response;
}

function calcularTiempoTranscurrido(fechaInicial: any, fechaFinal: any) {
  let fechaInicio = new Date(fechaInicial);
  let fechaFin = new Date(fechaFinal);
  let holiday: string[] = [];
  const consulta = holidays_co();

  consulta.forEach((element: any) => {
    holiday.push(element.date);
  });

  let tiempoTranscurrido = fechaFin.getTime() - fechaInicio.getTime(); // Diferencia en milisegundos

  // Convertir la diferencia a días, horas, minutos y segundos
  let segundos = Math.floor(tiempoTranscurrido / 1000) % 60;
  let minutos = Math.floor(tiempoTranscurrido / (1000 * 60)) % 60;
  let horas = Math.floor(tiempoTranscurrido / (1000 * 60 * 60));
  // let dias = Math.floor(tiempoTranscurrido / (1000 * 60 * 60 * 24));

  // Excluir los domingos y los días holiday
  const unDiaEnMilisegundos = 24 * 60 * 60 * 1000; // Cantidad de milisegundos en un día
  let fechaTemp = new Date(fechaInicio);

  while (fechaTemp < fechaFin) {
    if (fechaTemp.getDay() === 0 || fechaTemp.getDay() === 6) { // Si es domingo
      // dias--; // Restar un día
      tiempoTranscurrido -= unDiaEnMilisegundos; // Restar un día en milisegundos
    }

    let fecha = `${fechaTemp.getFullYear()}-${(fechaTemp.getMonth() + 1).toString().padStart(2, "0")}-${(fechaTemp.getDate()).toString().padStart(2, "0")}`;
    holiday.forEach(element => {
      if (element === fecha) {
        // dias--; // Restar un día
        tiempoTranscurrido -= unDiaEnMilisegundos; // Restar un día en milisegundos
      }
    });

    fechaTemp.setTime(fechaTemp.getTime() + unDiaEnMilisegundos); // Avanzar al siguiente día
  }

  // Recalcular los días, horas, minutos y segundos después de excluir los domingos y días festivos
  segundos = Math.floor(tiempoTranscurrido / 1000) % 60;
  minutos = Math.floor(tiempoTranscurrido / (1000 * 60)) % 60;
  horas = Math.floor(tiempoTranscurrido / (1000 * 60 * 60));
  // dias = Math.floor(tiempoTranscurrido / (1000 * 60 * 60 * 24));

  return `Horas: ${Math.abs(horas)}, Minutos: ${Math.abs(minutos)}, Segundos: ${Math.abs(segundos)}`;
}

/**
 * Calculates the total number of hours between two given dates, excluding holidays.
 *
 * @param {String} day_initial - The initial date to calculate the time response from.
 * @param {String} day_final - The final date to calculate the time response until.
 * @return {number} The total number of hours between the two dates, excluding holidays.
 * @customfunction
 */
function TIEMPORESPUESTA(initial: any, final: any) {
  let inicio = initial;
  let fin = final;
  let timer = calcularTiempoTranscurrido(inicio, fin);

  if (inicio !== "" && final !== "") {
    return timer;
  }

  return "";
}

function getSheetData() {
  const spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet: GoogleAppsScript.Spreadsheet.Sheet | null = spreadsheet.getSheetByName("SEGUIMIENTO PQRF");

  if (sheet) {
    const data: GoogleAppsScript.Spreadsheet.Range = sheet.getRange(4, 1, sheet.getLastRow(), sheet.getLastColumn());
    const values: any = data.getValues().filter(e => e[2] != "");
    return JSON.stringify(values);
  }

  return JSON.stringify({ error: "Sheet not Found" });
}

function doGet() {
  const html: GoogleAppsScript.HTML.HtmlTemplate = HtmlService.createTemplateFromFile('public/index.html');
  const page: GoogleAppsScript.HTML.HtmlOutput = html.evaluate().setTitle('Dashboard PQRS')
    .setFaviconUrl("https://soaics.grupoaltum.com.co/assets/media/logos/favicon.png");

  return page;
}

function abrirInforme() {
  var html: GoogleAppsScript.HTML.HtmlOutput = HtmlService.createHtmlOutput('<html>'
    + '<script>' +
    "var urlToOpen = 'https://script.google.com/macros/s/AKfycbxqBq7Xl5x_cnfSDH0IOLzJz2ENj5ZPgX6wkwzL1syFEePFLKdSz7uYhQLtx3mBEwos/exec';" +
    "var winRef = window.open(urlToOpen);" +
    "google.script.host.close();"
    + '</script>'
    + '</html>')
    .setWidth(90).setHeight(1);
  SpreadsheetApp.getUi().showModalDialog(html, "Abriendo Informe");
}

/**
 * Executes when the spreadsheet is opened.
 *
 * @param {Object} e - The event object.
 */
function onOpen(e: any) {
  try {
    const menu: any = SpreadsheetApp.getUi().createMenu('ADMINISTRACIÓN PQRS');
    const recipients: any = {
      'Informes': 'abrirInforme',
    };
    for (const [name, recipient] of Object.entries(recipients)) {
      menu.addItem(name, recipient);
    }
    menu.addToUi();
  } catch (error: any) {
    Logger.log(`${error.name}: ${error.message}`);
  }
}
