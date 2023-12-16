import "../Css/kart.css";
import "./InMemory";
import { EquipmentKart, MonsterKart, PotionKart } from "./InMemory";

function Card({ selectedCard }) {
  return (
    <div
      className={"kart"}
      style={{
        backgroundImage: `url(${selectedCard.pngUrl})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <header className={"cardHeader"}>
        <h1>{selectedCard.name}</h1>
        <span>{selectedCard.type === "Monster" ? "Enemy" : "Ally"}</span>{" "}
        <span>{selectedCard.type}</span>
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
    <div>
      <h3>{bonus}</h3>
      <p>{talk}</p>
      <span>Attack: {attack}</span> <span>Shield :{shield}</span>{" "}
      <span>Health :{health}</span>
    </div>
  );
}

function PotionCardProp({ healthGain, moneyGain, talk, bonus }) {
  return (
    <div>
      <h3>{bonus}</h3>
      <p>{talk}</p>
      <span>HealthGain :{healthGain}</span> <span>MoneyGain: {moneyGain}</span>
    </div>
  );
}

function EquipmentCardProp({ power, bonus, cost, talk }) {
  return (
    <div>
      <h3>{bonus}</h3>
      <p>{talk}</p>
      <span>Power :{power}</span> <span>Bonus: {cost}</span>
    </div>
  );
}
function MoneyCard({ gain, talk }) {
  return (
    <div>
      <p>{talk}</p>
      <span>Money Gain :{gain}</span>
    </div>
  );
}

export default Card;
