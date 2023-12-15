import "../Css/kart.css";
import "./InMemory";
import { MonsterKart } from "./InMemory";

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
      ) : (
        ""
      )}
    </div>
  );
}

function MonsterCardProperty({ attack, health, shield, bonus, talk }) {
  return (
    <div>
      <h3>{bonus}</h3>
      <p>{talk}</p>
      <span>{attack}</span> <span>{shield}</span> <span>{health}</span>
    </div>
  );
}

export default Card;
