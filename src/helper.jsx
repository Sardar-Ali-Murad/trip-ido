import { format } from "date-fns";

export const manageSpacing = (data = "") => {
  if (!data) return "N/A";
  var num = data.match(/\d+/g);
  var st = data.match(/[a-zA-Z]+/g)[0].toString();
  let letr = st.length > 3 && st == "minutes" ? st.substring(0, 3) : st;
  return `${num[0]} ${letr}`;
};

export const splitAddress = (data) => {
  if (!data) return "N/A";
  var newData = data.split(",");
  return newData;
};

export const formatDateForReadable = (currDate) => {
  if (currDate) {
    const newDate = new Date(currDate)

    return format(newDate, 'yyyy/MM/dd HH:MM').toString().replaceAll('/', '-')
  } else return ''
}
// debugger;
export const convertor = (obj) => {
  let arr = []
  Object.keys(obj).map((el) => {
    const ob = { id: +el, label: obj[el].full_label.join(', ') }
    arr.push(ob)
  })
  return arr
}

