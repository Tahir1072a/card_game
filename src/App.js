import { EquipmentKart, Gamer } from "./Components/InMemory";
import React, { useState } from "react";
import { GameEngine } from "./Engine";
import { GamerProfile } from "./Components/Profile/GamerProfile";
import { CurrentCard, Table } from "./Components/Table/Table";
import { Information } from "./Components/HowToPlay/Information";

const defaultEquipment = new EquipmentKart(
  -1,
  "Yumruk",
  0,
  0,
  "Gücü yok",
  "Sıradan bir yumruk",
  0,
  1,
  process.env.PUBLIC_URL + `game/punch.jpg`
);
const gamer = new Gamer(
  0,
  "Tahiri",
  [defaultEquipment],
  19,
  19,
  2,
  process.env.PUBLIC_URL + `game/avatar1.jpeg`
);

const gameEngine = new GameEngine(defaultEquipment, 19);
function App() {
  const [currentGamer, setGamer] = useState(gamer);
  const [selectedEquipment, setSelectedEquipment] = useState(defaultEquipment);

  return (
    <div className="app">
      <div className="top-content">
        <GamerProfile
          gamer={currentGamer}
          selectedEquipment={selectedEquipment}
          setSelectedEquipment={setSelectedEquipment}
          gameEngine={gameEngine}
        />
        <Information />
      </div>
      <Table>
        {[0, 1, 2, 3].map((p) => (
          <CurrentCard
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
