import Upload from "./components/Upload";
import Query from "./components/Query";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        🧾 Smart Bill Analyzer
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
          <Upload />
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
          <Query />
        </div>
      </div>
    </div>
  );
}

export default App;
