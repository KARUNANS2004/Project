export const parseQuery = (query) => {
  const lower = query.toLowerCase();

  let intent = null;
  let item = null;
  let time = null;
  let date = null;

  // 🧠 INTENT
  if (
    lower.includes("total") ||
    lower.includes("spent") ||
    lower.includes("spend") ||
    lower.includes("cost")
  ) {
    intent = "total";
  } else if (lower.includes("item") || lower.includes("bought")) {
    intent = "items";
  }

  // 🧠 TIME
  if (lower.includes("this month")) time = "this_month";
  else if (lower.includes("last month")) time = "last_month";
  else if (lower.includes("today") || lower.includes("this date"))
    time = "today";

  // 🧠 DATE (dd/mm/yyyy)
  const dateMatch = lower.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
  if (dateMatch) {
    const [d, m, y] = dateMatch[0].split("/");
    date = new Date(`${y}-${m}-${d}`);
  }

  // 🧠 ITEM detection (basic)
  const words = lower.split(" ");
  const possibleItems = ["milk", "bread", "eggs"]; // can expand later

  for (let w of words) {
    if (possibleItems.includes(w)) {
      item = w;
    }
  }

  return { intent, item, time, date };
};
