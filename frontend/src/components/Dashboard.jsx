import Upload from "./Upload";
import Query from "./Query";
import BillHistory from "./BillHistory";

export default function Dashboard() {
  return (
    <div className="flex-1 p-8 space-y-6">
      <h1 className="text-4xl font-bold">Welcome back 👋</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-600 p-4 rounded-2xl">
          <p>Total Spend</p>
          <h2 className="text-2xl font-bold">₹3200</h2>
        </div>

        <div className="bg-green-600 p-4 rounded-2xl">
          <p>Bills Uploaded</p>
          <h2 className="text-2xl font-bold">12</h2>
        </div>

        <div className="bg-purple-600 p-4 rounded-2xl">
          <p>Top Item</p>
          <h2 className="text-2xl font-bold">Milk</h2>
        </div>

        <div className="bg-pink-600 p-4 rounded-2xl">
          <p>Avg Bill</p>
          <h2 className="text-2xl font-bold">₹266</h2>
        </div>
      </div>

      <Upload />
      <Query />
      <BillHistory />
    </div>
  );
}
