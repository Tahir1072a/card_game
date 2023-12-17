import Table from "./Components/Table";
import GamerProfile from "./Components/Profile";
import { EquipmentKart, Equipments, Gamer } from "./Components/InMemory";
import { useState } from "react";

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
  10,
  process.env.PUBLIC_URL + `game/avatar1.jpeg`,
);

function App() {
  const [currentGamer, setGamer] = useState(gamer);
  const [selectedEquipment, setSelectedEquipment] = useState(defaultEquipment);
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
    if (gain > 0 && currentGamer.health === 19) return;
    setGamer((g) => ({ ...g, health: g.health + gain }));
  }
  function setMoney(gain) {
    setGamer((g) => ({ ...g, money: g.money + gain }));
  }
  function usedEquipments(used) {
    if (used.id === -1) return;
    setGamer((g) => ({
      ...g,
      equipments: g.equipments.filter((equipment) => equipment !== used),
    }));
  }
  function buyEquipments(bought) {
    setGamer((g) => ({ ...g, equipments: [...g.equipments, bought] }));
  }
  function setEquipment(id) {
    if (id === -1) {
      setSelectedEquipment(defaultEquipment);
      return;
    }
    const newEquipment = Equipments.find((p) => p.id === id);
    setSelectedEquipment(newEquipment);
  }
  return (
    <div className="app">
      <GamerProfile
        gamer={currentGamer}
        selectedEquipment={selectedEquipment}
        setEquipment={setEquipment}
      />
      <Table
        gamer={currentGamer}
        setMoney={setMoney}
        setHealth={setHealth}
        buyEquipments={buyEquipments}
        usedEquipments={usedEquipments}
        selectedEquipment={selectedEquipment}
        reduceShield={reduceShield}
      />
    </div>
  );
}

export default App;
