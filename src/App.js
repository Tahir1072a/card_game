import { Table, Pozisyon } from "./Components/Table";
import { GamerProfile } from "./Components/Profile";
import { EquipmentKart, Gamer } from "./Components/InMemory";
import { useState } from "react";
import { GameEngine } from "./Engine";

const defaultEquipment = new EquipmentKart(
  -1,
  "Equipment",
  "Yumruk",
  0,
  "None",
  "Sadece ellerim",
  0,
  1,
  "",
);
const gamer = new Gamer(
  0,
  "Tahiri",
  [defaultEquipment],
  19,
  19,
  2,
  process.env.PUBLIC_URL + `game/avatar1.jpeg`,
);
const gameEngine = new GameEngine(defaultEquipment, 19);
function App() {
  const [currentGamer, setGamer] = useState(gamer);
  const [selectedEquipment, setSelectedEquipment] = useState(defaultEquipment);

  return (
    <div className="app">
      <GamerProfile
        gamer={currentGamer}
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
        gameEngine={gameEngine}
      />
      <Table>
        {[0, 1, 2, 3].map((p) => (
          <Pozisyon
            key={p}
            gamer={currentGamer}
            setGamer={setGamer}
            selectedEquipment={selectedEquipment}
            setSelectedEquipment={setSelectedEquipment}
            gameEngine={gameEngine}
          />
        ))}
      </Table>
    </div>
  );
}

export default App;
