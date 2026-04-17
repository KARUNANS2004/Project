import { FaChartBar, FaRobot, FaHistory } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white/5 backdrop-blur-xl p-6 border-r border-white/10">
      <h1 className="text-2xl font-bold mb-10">🧾 SpendSense</h1>

      <div className="space-y-4 text-lg">
        <p className="hover:text-blue-400 cursor-pointer flex gap-2">
          <FaChartBar /> Dashboard
        </p>

        <p className="hover:text-blue-400 cursor-pointer flex gap-2">
          <FaRobot /> AI Query
        </p>

        <p className="hover:text-blue-400 cursor-pointer flex gap-2">
          <FaHistory /> History
        </p>
      </div>
    </div>
  );
}
