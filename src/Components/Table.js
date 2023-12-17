import "../Css/kart.css";
import Card from "./Card";
import { useState } from "react";
import "./InMemory";
import cards, {
  EquipmentKart,
  MoneyKart,
  MonsterKart,
  myCard,
  PotionKart,
} from "./InMemory";

let allCards = [...cards];
const defaultCard = new myCard(
  -1,
  "default",
  "no-name",
  0,
  process.env.PUBLIC_URL + `game/background.jpeg`,
);
function Table({
  gamer,
  setMoney,
  setHealth,
  buyEquipments,
  usedEquipments,
  selectedEquipment,
  reduceShield,
}) {
  return (
    <div className={"table"}>
      {[0, 1, 2, 3].map((p) => (
        <Pozisyon
          key={p}
          gamer={gamer}
          setMoney={setMoney}
          setHealth={setHealth}
          buyEquipments={buyEquipments}
          usedEquipments={usedEquipments}
          selectedEquipment={selectedEquipment}
          reduceShield={reduceShield}
        />
      ))}
    </div>
  );
}

function Pozisyon({
  gamer,
  setMoney,
  setHealth,
  buyEquipments,
  usedEquipments,
  selectedEquipment,
  reduceShield,
}) {
  const [selectedCard, setSelectedCard] = useState(defaultCard);
  const [isOpen, setStateOpen] = useState(false);

  function select() {
    if (allCards.length < 1) {
      alert("Oyun Bitti Kazandınız!");
      window.location.reload();
      return;
    }

    const typeIndex = Math.floor(Math.random() * allCards.length);
    const cardIndex = Math.floor(Math.random() * allCards[typeIndex].length);

    setStateOpen(true);
    setSelectedCard(allCards[typeIndex][cardIndex]);
    if (allCards[typeIndex][cardIndex].copyCount <= 1) {
      allCards = allCards
        .map((p) => p.filter((s) => s !== allCards[typeIndex][cardIndex]))
        .filter((k) => k.length > 0);
    } else {
      allCards[typeIndex][cardIndex].copyCount += -1;
    }
  }

  function moneyTake(selectedCard) {
    if (selectedCard instanceof MoneyKart) {
      setMoney(selectedCard.gain);
    }
    setSelectedCard(defaultCard);
    setStateOpen(false);
  }
  function drinkPotion() {
    if (selectedCard instanceof PotionKart) {
      setHealth(selectedCard.healthGain);
      setMoney(selectedCard.moneyGain);
    }

    setSelectedCard(defaultCard);
    setStateOpen(false);
  }
  function Buy(selectedCard) {
    if (selectedCard instanceof EquipmentKart) {
      buyEquipments(selectedCard);
      setMoney(-selectedCard.cost);
    }

    setSelectedCard(defaultCard);
    setStateOpen(false);
  }
  function DontBuy() {
    setStateOpen(false);
    setSelectedCard(defaultCard);
  }
  function Attack(selectedCard) {
    if (selectedCard instanceof MonsterKart) {
      const monsterLife = selectedCard.shield + selectedCard.health;
      if (selectedEquipment instanceof EquipmentKart) {
        if (selectedEquipment.power < monsterLife) {
          reduceShield(selectedCard.attack);
        } else {
          usedEquipments(selectedEquipment);
        }
      }
    }
    setSelectedCard(defaultCard);
    setStateOpen(false);
  }
  return (
    <div className={"pozisyon"}>
      <Card selectedCard={selectedCard} />
      {isOpen ? (
        selectedCard instanceof EquipmentKart ? (
          <div>
            <button
              className={
                gamer.money >= selectedCard.cost
                  ? "kartButton"
                  : "kartButtonDisabled"
              }
              onClick={() => Buy(selectedCard)}
              disabled={gamer.money < selectedCard.cost}
            >
              Buy
            </button>

            <button className={"kartButton"} onClick={DontBuy}>
              Don't Buy
            </button>
          </div>
        ) : selectedCard instanceof MonsterKart ? (
          <div>
            <button
              className={"kartButton"}
              onClick={() => Attack(selectedCard)}
            >
              Attack!
            </button>
          </div>
        ) : selectedCard instanceof PotionKart ? (
          <button
            className={"kartButton"}
            onClick={() => drinkPotion(selectedCard)}
          >
            Drink
          </button>
        ) : (
          <button
            className={"kartButton"}
            onClick={() => moneyTake(selectedCard)}
          >
            Take
          </button>
        )
      ) : (
        <button onClick={select} className={"kartButton"}>
          Show
        </button>
      )}
    </div>
  );
}

export default Table;
