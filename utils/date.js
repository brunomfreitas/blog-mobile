export function formatDateBR(date) {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}


export function maskDate(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .slice(0, 10);
}


export function brToIso(dateBR) {
  if (!dateBR) return null;
  const [day, month, year] = dateBR.split("/");
  return `${year}-${month}-${day}`;
}


export function isoToBr(dateISO) {
  if (!dateISO) return "";
  const [year, month, day] = dateISO.split("-");
  return `${day}/${month}/${year}`;
}
