export function reformatDate(date){
  const d = new Date(date);
  const newDate = d.getMonth()+ "/" + d.getDate()  + "/" + d.getFullYear();
  return newDate;
}