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
export function Table({ children }) {
  return <div className={"table"}>{children}</div>;
}

export function Pozisyon({
  gamer,
  setGamer,
  selectedEquipment,
  setSelectedEquipment,
  gameEngine,
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

  function handleMoneyTake(selectedCard) {
    if (selectedCard instanceof MoneyKart) {
      gameEngine.SetMoney(setGamer, selectedCard.gain);
    }
    setSelectedCard(defaultCard);
    setStateOpen(false);
  }
  function drinkPotion() {
    if (selectedCard instanceof PotionKart) {
      gameEngine.SetHealth(gamer, setGamer, selectedCard.healthGain);
      gameEngine.SetMoney(setGamer, selectedCard.moneyGain);
    }

    setSelectedCard(defaultCard);
    setStateOpen(false);
  }
  function Buy(selectedCard) {
    if (selectedCard instanceof EquipmentKart) {
      gameEngine.AddEquipment(setGamer, selectedCard);
      gameEngine.SetMoney(setGamer, -selectedCard.cost);
    }

    setSelectedCard(defaultCard);
    setStateOpen(false);
  }
  function DontBuy() {
    setStateOpen(false);
    setSelectedCard(defaultCard);
  }
  function Attack(selectedCard) {
    gameEngine.Attack(
      gamer,
      setGamer,
      selectedEquipment,
      setSelectedEquipment,
      selectedCard,
    );
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

            <CardButtons onClick={() => DontBuy(selectedCard)}>
              Dont Buy
            </CardButtons>
          </div>
        ) : selectedCard instanceof MonsterKart ? (
          <CardButtons onClick={() => Attack(selectedCard)}>Attack</CardButtons>
        ) : selectedCard instanceof PotionKart ? (
          <CardButtons onClick={() => drinkPotion(selectedCard)}>
            Drink
          </CardButtons>
        ) : (
          <CardButtons onClick={() => handleMoneyTake(selectedCard)}>
            Take
          </CardButtons>
        )
      ) : (
        <CardButtons onClick={select}>Show</CardButtons>
      )}
    </div>
  );
}

function CardButtons({ onClick, children }) {
  return (
    <button className={"kartButton"} onClick={onClick}>
      {children}
    </button>
  );
}

// Buraya bir bak!

// function AttackBox({ gamer }) {
//   return (
//     <div>
//       {gamer.equipments.map((p) => (
//         <Card selectedCard={p}></Card>
//       ))}
//     </div>
//   );
// }
