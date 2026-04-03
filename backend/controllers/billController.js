import Bill from "../models/Bill.js";
import { parseQuery } from "../utils/nlpParser.js";
import { extractTextFromImage } from "../utils/ocr.js";
import { parseBill } from "../utils/parser.js";

export const uploadBill = async (req, res) => {
  try {
    const filePath = req.file.path;

    const text = await extractTextFromImage(filePath);
    const parsed = parseBill(text);

    const savedBill = await Bill.create(parsed);

    res.json({ success: true, data: savedBill });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getItemsLastMonth = async (req, res) => {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const bills = await Bill.find({ date: { $gte: lastMonth } });

  const items = bills.flatMap((b) => b.items.map((i) => i.name));

  res.json([...new Set(items)]);
};

export const getTotalByItem = async (req, res) => {
  const itemName = req.params.item.toLowerCase();

  const bills = await Bill.find();

  let total = 0;

  bills.forEach((bill) => {
    bill.items.forEach((item) => {
      if (item.name.toLowerCase() === itemName) {
        total += item.price;
      }
    });
  });

  res.json({ total });
};

// export const handleQuery = async (req, res) => {
//   try {
//     const { query } = req.body;
//     const lower = query.toLowerCase();

//     const bills = await Bill.find();

//     // 🧠 detect time
//     let filteredBills = bills;

//     // 🧠 DATE-BASED QUERY
//     const dateMatch = lower.match(/\d{2}\/\d{2}\/\d{4}/);

//     if (lower.includes("this date")) {
//       const today = new Date();

//       const start = new Date(today);
//       start.setHours(0, 0, 0, 0);

//       const end = new Date(today);
//       end.setHours(23, 59, 59, 999);

//       const bills = await Bill.find({
//         date: { $gte: start, $lte: end },
//       });

//       const items = bills.flatMap((b) => b.items.map((i) => i.name));

//       return res.json({ result: [...new Set(items)] });
//     }

//     if (dateMatch) {
//       const [day, month, year] = dateMatch[0].split("/");

//       const targetDate = new Date(`${year}-${month}-${day}`);

//       const start = new Date(targetDate);
//       start.setHours(0, 0, 0, 0);

//       const end = new Date(targetDate);
//       end.setHours(23, 59, 59, 999);

//       const bills = await Bill.find({
//         date: { $gte: start, $lte: end },
//       });

//       const items = bills.flatMap((b) => b.items.map((i) => i.name));

//       return res.json({ result: [...new Set(items)] });
//     }

//     if (lower.includes("this month")) {
//       const now = new Date();
//       const start = new Date(now.getFullYear(), now.getMonth(), 1);

//       filteredBills = bills.filter((b) => new Date(b.date) >= start);
//     }

//     if (lower.includes("last month")) {
//       const now = new Date();

//       const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
//       const end = new Date(now.getFullYear(), now.getMonth(), 0);

//       filteredBills = bills.filter((b) => {
//         const d = new Date(b.date);
//         return d >= start && d <= end;
//       });
//     }

//     // 🧠 detect "total"
//     if (lower.includes("total") || lower.includes("spent")) {
//       const words = lower.split(" ");

//       let total = 0;

//       filteredBills.forEach((bill) => {
//         bill.items.forEach((item) => {
//           if (words.includes(item.name.toLowerCase())) {
//             total += item.price;
//           }
//         });
//       });

//       return res.json({ result: total });
//     }

//     // 🧠 detect "items"
//     if (lower.includes("item") || lower.includes("bought")) {
//       const items = filteredBills.flatMap((b) => b.items.map((i) => i.name));
//       return res.json({ result: [...new Set(items)] });
//     }

//     return res.json({ result: "I didn’t understand that 🤔" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const handleQuery = async (req, res) => {
  try {
    const { query } = req.body;

    const { intent, time, date } = parseQuery(query);
    let item = null;

    // 🧠 DYNAMIC ITEM DETECTION
    const words = query.toLowerCase().split(" ");

    let allItems = [];

    const billsData = await Bill.find();

    billsData.forEach((bill) => {
      bill.items.forEach((i) => {
        allItems.push(i.name.toLowerCase());
      });
    });

    allItems = [...new Set(allItems)];

    for (let w of words) {
      if (allItems.includes(w)) {
        item = w;
      }
    }

    console.log("Detected:", { intent, item, time, date });

    let bills = await Bill.find();

    // 🧠 FILTER BY TIME
    if (time === "this_month") {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);

      bills = bills.filter((b) => new Date(b.date) >= start);
    }

    if (time === "last_month") {
      const now = new Date();

      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);

      bills = bills.filter((b) => {
        const d = new Date(b.date);
        return d >= start && d <= end;
      });
    }

    if (time === "today") {
      const today = new Date();

      bills = bills.filter((b) => {
        const d = new Date(b.date);
        return d.toDateString() === today.toDateString();
      });
    }

    // 🧠 FILTER BY DATE
    if (date) {
      bills = bills.filter((b) => {
        const d = new Date(b.date);
        return d.toDateString() === date.toDateString();
      });
    }

    // 🧠 INTENT HANDLING
    if (intent === "total" && item) {
      let total = 0;

      bills.forEach((bill) => {
        bill.items.forEach((i) => {
          if (i.name.toLowerCase() === item) {
            total += i.price;
          }
        });
      });

      return res.json({ result: total });
    }

    if (intent === "items") {
      const items = bills.flatMap((b) => b.items.map((i) => i.name));
      return res.json({ result: [...new Set(items)] });
    }

    return res.json({ result: "Could not understand query 🤔" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
