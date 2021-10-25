export function reformatDate(date){
  const d = new Date(date);
  const newDate = (d.getMonth() + 1)+ "-" + (d.getDate() + 1)  + "-" + d.getFullYear();
  return newDate;
}