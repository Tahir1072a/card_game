import "../../Css/kart.css";
import React, { useState } from "react";
import { EquipmentImg } from "../Profile/GamerEquipments";
import MainCardStructure from "../GameCard/MainCardStructure";
import "boxicons";

export function AttackBox({ gameEngine, onAttack, monster, gamer, children }) {
  const [opacity, setOpacity] = useState(0);
  const [isAttack, setIsAttack] = useState(false);
  const [isDefeat, setIsDefeat] = useState(false);

  if (!isAttack) {
    setTimeout(() => {
      setOpacity(1);
    }, 10);
  }

  const defeatStyle = {
    backgroundColor: "rgba(255,0,0,0.5)",
  };
  const victoryStyle = {
    backgroundColor: "rgba(0,255,0,0.4)",
  };

  function handleAttack(equipment) {
    setIsAttack(true);
    setIsDefeat(!gameEngine.IsWin(equipment, monster.health + monster.shield));
    setTimeout(() => setOpacity(0), 1000);
    setTimeout(() => {
      onAttack(monster, equipment);
    }, 1600);
  }

  return (
    <div
      style={{
        transition:
          "background-color 0.1s ease-in-out, opacity 0.6s ease-in-out",
        opacity: opacity,
        ...(isAttack ? (isDefeat ? defeatStyle : victoryStyle) : {}),
      }}
      className="attack-box"
    >
      <SelectEquipment equipments={gamer.equipments} onAttack={handleAttack} />
      {children}
    </div>
  );
}

function SelectEquipment({ equipments, onAttack }) {
  const [currentIndex, setIndex] = useState(0);
  const count = equipments.length - 1;

  function handleBack() {
    if (currentIndex === 0) {
      setIndex(count);
    } else if (currentIndex > 0) {
      setIndex((old) => old - 1);
    }
  }

  function handleNext() {
    if (currentIndex === count) {
      setIndex(0);
    } else if (currentIndex < count) {
      setIndex((old) => old + 1);
    }
  }

  function handleSelect(id) {
    for (let i = 0; i < equipments.length; i++) {
      if (equipments[i].id === id) {
        setIndex(i);
        return;
      }
    }
  }

  return (
    <div className="equipment">
      <div className="main-equipment">
        {equipments.map((p) => (
          <div key={p.id} onClick={() => handleSelect(p.id)}>
            <EquipmentImg equipment={p} />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: ".7rem" }}>
        <MainCardStructure
          selectedCard={equipments[currentIndex]}
        ></MainCardStructure>

        <div className="equipment-buttons">
          <div onClick={handleBack} className="icon">
            <box-icon
              style={{ fill: "#fff" }}
              name="chevron-left"
              className="prev-icon"
            ></box-icon>
          </div>
          <button
            onClick={() => onAttack(equipments[currentIndex])}
            className="attack-button"
          >
            Attack
          </button>
          <div onClick={handleNext} className="icon">
            <box-icon
              style={{ fill: "#fff" }}
              name="chevron-right"
              className="next-icon"
            ></box-icon>
          </div>
        </div>
      </div>
    </div>
  );
}
