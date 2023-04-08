export const numberWithCommas = (value: string) => {
  value = value.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(value)) value = value.replace(pattern, "$1,$2");
  return value;
};

export const formatDate = (date: any) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
