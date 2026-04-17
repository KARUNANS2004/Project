export default function BillHistory() {
  return (
    <div className="bg-white/5 p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">🧾 Bill History</h2>

      <div className="space-y-3">
        <div className="bg-slate-800 p-3 rounded-xl">
          02 Apr 2026 — ₹130 (Milk, Bread, Eggs)
        </div>

        <div className="bg-slate-800 p-3 rounded-xl">
          05 Apr 2026 — ₹220 (Rice, Milk)
        </div>
      </div>
    </div>
  );
}
