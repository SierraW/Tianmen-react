const month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

function formatDateMDY(dateString) {
  var dateArr = dateString.split("-");
  return `${month[parseInt(dateArr[1]-1)]} ${dateArr[0]}, ${dateArr[2]}`;
}

function datePrettyPrint(dt) {
  return `${dt
    .getFullYear()
    .toString()
    .padStart(4, "0")}/${(dt.getMonth() + 1).toString().padStart(2, "0")}/${dt
    .getDate()
    .toString()
    .padStart(2, "0")} ${dt
    .getHours()
    .toString()
    .padStart(2, "0")}:${dt
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${dt
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export { datePrettyPrint, formatDate, formatDateMDY };
