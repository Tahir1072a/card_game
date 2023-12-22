import "../Css/kart.css";
import "./InMemory";
import { EquipmentKart, MoneyKart, MonsterKart, PotionKart } from "./InMemory";
import { useState } from "react";

function Card({ selectedCard }) {
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
        ...shadowStyle,
      }}
      onMouseEnter={() => onEnter()}
      onMouseLeave={() => onLeave()}
    >
      <header className={"cardHeader"}>
        <h1>{selectedCard.name}</h1>
        <div className={"types"}>
          <span>{selectedCard.type === "Monster" ? "Enemy" : "Ally"}</span>{" "}
          <span>&</span>
          <span>{selectedCard.type}</span>
        </div>
      </header>

      {selectedCard instanceof MonsterKart ? (
        <MonsterCardProperty
          attack={selectedCard.attack}
          health={selectedCard.health}
          shield={selectedCard.shield}
          bonus={selectedCard.bonus}
          talk={selectedCard.talk}
        />
      ) : selectedCard instanceof PotionKart ? (
        <PotionCardProp
          bonus={selectedCard.bonus}
          talk={selectedCard.talk}
          moneyGain={selectedCard.moneyGain}
          healthGain={selectedCard.healthGain}
        />
      ) : selectedCard instanceof EquipmentKart ? (
        <EquipmentCardProp
          cost={selectedCard.cost}
          talk={selectedCard.talk}
          bonus={selectedCard.bonus}
          power={selectedCard.power}
        />
      ) : (
        <MoneyCard talk={selectedCard.talk} gain={selectedCard.gain} />
      )}
    </div>
  );
}

function MonsterCardProperty({ attack, health, shield, bonus, talk }) {
  return (
    <div className="bottom">
      <div className="bonus">
        Remove all exhaustion tokens from this unit at the end of each round.
      </div>{" "}
      <p className="talk">{talk}</p>
      <div className="posions">
        <span className="posion attack">Attack: {attack}</span>{" "}
        <span className="posion shield">Shield :{shield}</span>{" "}
        <span className="posion health">Health :{health}</span>
      </div>
    </div>
  );
}

function PotionCardProp({ healthGain, moneyGain, talk, bonus }) {
  return (
    <div className="bottom">
      <div className="bonus">
        Remove all exhaustion tokens from this unit at the end of each round.
      </div>
      <p className="talk">{talk}</p>
      <div className="posions">
        <span className="posion health">HealthGain :{healthGain}</span>{" "}
        <span className="posion">MoneyGain: {moneyGain}</span>
      </div>
    </div>
  );
}

function EquipmentCardProp({ power, bonus, cost, talk }) {
  return (
    <div className="bottom">
      <div className="bonus">
        Remove all exhaustion tokens from this unit at the end of each round.
      </div>
      <p className="talk">{talk}</p>
      <div className="posions">
        <span className="posion">Power :{power}</span>{" "}
        <span className="posion">Cost: {cost}</span>
      </div>
    </div>
  );
}
function MoneyCard({ gain, talk }) {
  return (
    <div className="bottom">
      <p className="talk">{talk}</p>
      <div className="posions">
        <span className="posion">Money Gain :{gain}</span>
      </div>
    </div>
  );
}

export default Card;
