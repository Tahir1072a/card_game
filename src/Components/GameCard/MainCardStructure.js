import "../../Css/kart.css";
import { useState } from "react";
import { EquipmentKart, MoneyKart, MonsterKart, PotionKart } from "../InMemory";
import { MonsterCardStructure } from "./MonsterCardStructure";
import { PotionCardStructure } from "./PotionCardStructure";
import { EquipmentCardStructure } from "./EquipmentCardStructure";
import { MoneyCardStructure } from "./MoneyCardStructure";
import { EquipmentTypes } from "../BonusTypes";

function MainCardStructure({ selectedCard, zIndex = 0 }) {
  const [shadowStyle, setShadowStyle] = useState({
    boxShadow: "none",
  });

  function onEnter() {
    if (selectedCard instanceof MonsterKart) {
      setShadowStyle((old) => ({
        ...old,
        boxShadow: "0 0 0.5rem 0.2rem rgba(255, 0, 0, 0.9)",
      }));
    } else if (selectedCard instanceof MoneyKart) {
      setShadowStyle((old) => ({
        ...old,
        boxShadow: "0 0 0.5rem 0.2rem rgba(255, 205, 10, 0.9)",
      }));
    } else if (selectedCard instanceof PotionKart) {
      setShadowStyle((old) => ({
        ...old,
        boxShadow: "0 0 0.5rem 0.2rem rgb(120,40,203,1)",
      }));
    } else {
      setShadowStyle((old) => ({
        ...old,
        boxShadow: "0 0 0.5rem 0.2rem rgb(0,0,255,0.9)",
      }));
    }
  }

  function onLeave() {
    setShadowStyle((old) => ({ ...old, boxShadow: "none" }));
  }

  if (selectedCard.id === -1) {
    return (
      <div
        className={"kart"}
        style={{
          backgroundImage: `linear-gradient(
          rgba(255, 255, 255, 0.1),
          rgba(255, 255, 255, 0.1)
        ),
        url(${selectedCard.pngUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: zIndex,
        }}
      ></div>
    );
  }
  return (
    <div
      className={"kart"}
      style={{
        backgroundImage: `linear-gradient(
          rgba(255, 255, 255, 0.1),
          rgba(255, 255, 255, 0.1)
        ),
        url(${selectedCard.pngUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: zIndex,
        ...shadowStyle,
      }}
      onMouseEnter={() => onEnter()}
      onMouseLeave={() => onLeave()}
    >
      <header className={"cardHeader"}>
        <h1>{selectedCard.name}</h1>
        <div className={"types"}>
          <span>{selectedCard instanceof MonsterKart ? "Enemy" : "Ally"}</span>{" "}
          <span>&</span>
          <span>
            {selectedCard instanceof MonsterKart && "Monster"}
            {selectedCard instanceof PotionKart && "Potion"}
            {selectedCard instanceof EquipmentKart && "Equipment"}
            {selectedCard instanceof MoneyKart && "Money"}
          </span>
        </div>
      </header>

      {selectedCard instanceof MonsterKart ? (
        <MonsterCardStructure
          attack={selectedCard.attack}
          health={selectedCard.health}
          shield={selectedCard.shield}
          bonus_text={selectedCard.bonus_text}
          talk={selectedCard.talk}
        />
      ) : selectedCard instanceof PotionKart ? (
        <PotionCardStructure
          bonus={selectedCard.bonus}
          talk={selectedCard.talk}
          moneyGain={selectedCard.moneyGain}
          healthGain={selectedCard.healthGain}
        />
      ) : selectedCard instanceof EquipmentKart ? (
        <>
          <EquipmentCardStructure
            cost={selectedCard.cost}
            talk={selectedCard.talk}
            bonus_text={selectedCard.bonus_text}
            power={selectedCard.power}
          />
          <div className={"equipment-tag"}>
            {selectedCard.type === EquipmentTypes.LIGHT
              ? "Hafif ekipman"
              : selectedCard.type === EquipmentTypes.MEDIUM
              ? "Orta ekipman"
              : "Ağır ekipman"}
          </div>
        </>
      ) : (
        <MoneyCardStructure talk={selectedCard.talk} gain={selectedCard.gain} />
      )}
    </div>
  );
}

export default MainCardStructure;
