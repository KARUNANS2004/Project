export const parseBill = (text) => {
  const lines = text.split("\n");

  let items = [];
  let totalAmount = 0;
  let date = new Date();

  lines.forEach((line) => {
    const lower = line.toLowerCase();

    // TOTAL
    if (lower.includes("total")) {
      const num = line.match(/\d+/);
      if (num) totalAmount = parseInt(num[0]);
      return; // 🔥 SKIP adding to items
    }

    // DATE
    const dateMatch = line.match(/\d{2}\/\d{2}\/\d{4}/);
    if (dateMatch) {
      date = new Date(dateMatch[0]);
      return;
    }

    // ITEMS
    const match = line.match(/([a-zA-Z]+)\s+(\d+)/);
    if (match) {
      items.push({
        name: match[1],
        price: parseInt(match[2]),
      });
    }
  });

  return { items, totalAmount, date };
};
