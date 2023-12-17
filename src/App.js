import Table from "./Components/Table";
import GamerProfile from "./Components/Profile";
import { Gamer } from "./Components/InMemory";

const gamer = new Gamer(
  0,
  "Tahiri",
  ["Yumruk", "Kılıç", "Tekme", "Balta"],
  19,
  19,
  10,
  process.env.PUBLIC_URL + `game/avatar1.jpeg`
);

function App() {
  return (
    <div className="app">
      <Table gamer={gamer} />
      <GamerProfile gamer={gamer} />
    </div>
  );
}

export default App;
