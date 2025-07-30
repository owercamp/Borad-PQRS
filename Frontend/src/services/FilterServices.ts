const filter_year = (year: number, info: any) => {
  const years = [(year - 1), year];
  let data: any = [];

  years.forEach((year: number) => {
    data.push(info.filter((row: any) => String(row[1]).includes(String(year))));
  })

  return [years, data];
}

export { filter_year };