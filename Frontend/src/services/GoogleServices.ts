import { filter_year } from "./FilterServices";

const googleService = async () => new Promise((resolve,) => {
  google.script.run.withSuccessHandler((response: any) => {
    let info = JSON.parse(response);
    resolve(info);
  }).getSheetData();
})

const googleDateSettlementServices = async () => {
  let info = await googleService();
  const year = new Date().getFullYear();
  const filter_for_year = filter_year(year, info);

  const month_series = new Set(["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sept.", "oct.", "nov.", "dic."]);
  const series: any[] = [];


  for (let index = 0; index < filter_for_year[1].length; index++) {
    const registers = filter_for_year[1][index];
    const serie = {
      "ene.": 0,
      "feb.": 0,
      "mar.": 0,
      "abr.": 0,
      "may.": 0,
      "jun.": 0,
      "jul.": 0,
      "ago.": 0,
      "sept.": 0,
      "oct.": 0,
      "nov.": 0,
      "dic.": 0
    };

    registers.map((register: any) => {
      try {
        let my_date: any = String(register[1]).split("T")[0].split("-");
        my_date = new Date(my_date[0], my_date[1] - 1, my_date[2]);
        if (String(register[1]).trim() && parseInt(String(register[1]).trim()) !== Infinity) {
          let registers_date = new Intl.DateTimeFormat('es-CO', {
            month: 'short'
          }).format(my_date);


          switch (registers_date) {
            case "ene.":
              serie["ene."] += 1;
              break;
            case "feb.":
              serie["feb."] += 1;
              break;
            case "mar.":
              serie["mar."] += 1;
              break;
            case "abr.":
              serie["abr."] += 1;
              break;
            case "may.":
              serie["may."] += 1;
              break;
            case "jun.":
              serie["jun."] += 1;
              break;
            case "jul.":
              serie["jul."] += 1;
              break;
            case "ago.":
              serie["ago."] += 1;
              break;
            case "sept.":
              serie["sept."] += 1;
              break;
            case "oct.":
              serie["oct."] += 1;
              break;
            case "nov.":
              serie["nov."] += 1;
              break;
            case "dic.":
              serie["dic."] += 1;
              break;
          }
        }
      } catch (error) { }
    });
    series.push(serie);
  }

  const result: any = [];

  month_series.forEach((month: any) => {
    result.push({
      "name": month,
      [`${filter_for_year[0][0]}`]: series[0][month],
      [`${filter_for_year[0][1]}`]: series[1][month],
    })
  })

  return result;
}

const googleCustomerServices = async () => new Promise((resolve) => {
  google.script.run.withSuccessHandler((response: any) => {
    let info = JSON.parse(response);
    console.warn(info);
    resolve("Hello world");
  }).getSheetData();
})

export { googleDateSettlementServices, googleCustomerServices };
