import Table from "./Components/Table";
import GamerProfile from "./Components/Profile";
import { Gamer } from "./Components/InMemory";
import { useState } from "react";

const gamer = new Gamer(
  0,
  "Tahiri",
  ["Yumruk", "Kılıç", "Tekme", "Balta"],
  19,
  19,
  10,
  process.env.PUBLIC_URL + `game/avatar1.jpeg`,
);

function App() {
  const [currentGamer, setGamer] = useState(gamer);

  function reduceHealth(hitPoint) {
    if (hitPoint > currentGamer.health) {
      setGamer((g) => ({ ...g, health: 0 }));
    } else {
      setGamer((oldGamer) => ({
        ...oldGamer,
        health: oldGamer.health - hitPoint,
      }));
    }
  }
  function reduceShield(hitPoint) {
    if (hitPoint > currentGamer.shield) {
      const extraPoint = hitPoint - currentGamer.shield;
      setGamer((g) => ({ ...g, shield: 0 }));
      reduceHealth(extraPoint);
    } else {
      setGamer((g) => ({ ...g, shield: g.shield - hitPoint }));
    }
  }
  function setHealth(gain) {
    setGamer((g) => ({ ...g, health: g.health + gain }));
  }
  function setMoney(gain) {
    setGamer((g) => ({ ...g, money: g.money + gain }));
  }
  function useEquipments(used) {
    setGamer((g) => ({
      ...g,
      equipments: g.equipments.filter((equipment) => equipment !== used),
    }));
  }
  function buyEquipments(bought) {
    setGamer((g) => ({ ...g, equipments: g.equipments.push(bought) }));
  }
  return (
    <div className="app">
      <Table
        gamer={currentGamer}
        setMoney={setMoney}
        setHealth={setHealth}
        buyEquipments={buyEquipments}
      />
      <GamerProfile gamer={currentGamer} />
    </div>
  );
}

export default App;
