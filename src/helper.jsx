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
    const newDate = new Date(currDate);

    return format(newDate, "yyyy/MM/dd HH:MM").toString().replaceAll("/", "-");
  } else return "";
};
// debugger;
export const convertor = (obj) => {
  let arr = [];
  Object.keys(obj).map((el) => {
    const ob = { id: +el, label: obj[el].full_label.join(", ") };
    arr.push(ob);
  });
  return arr;
};

export function replaceWithUnderscoreAndHyphen(str) {
  return str ? str.replace(/, /g, "-").replace(/ /g, "_") : "";
}

export function replaceWithSpaceAndComma(str) {
  return str ? str.replace(/-/g, ", ").replace(/_/g, " ") : "";
}

export const start = (origin, destination, category, tab, router) => {
  if (origin !== undefined && origin !== "" && category !== undefined) {
    origin = replaceWithUnderscoreAndHyphen(origin);
    category = replaceWithUnderscoreAndHyphen(category);
    destination = replaceWithUnderscoreAndHyphen(destination);
    if (tab === 0) {
      let pathname = "";
      if (origin && origin !== "") {
        pathname += `/${origin}`;
      }
      if (category && category !== "" && origin) {
        pathname += `/${category}`;
      }
      router.push(pathname);
    }
    if (tab === 1) {
      let pathname = "";
      if (origin && origin !== "") {
        pathname += `/${origin}`;
      }
      if (origin && origin !== "" && destination && destination !== "") {
        pathname += `.${destination}`;
      }
      if (category && category !== "" && origin) {
        pathname += `/${category}`;
      }
      {
        router.push(pathname);
      }
    }
  }
};
