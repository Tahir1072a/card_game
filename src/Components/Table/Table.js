import "../../Css/kart.css";
import React, { useState } from "react";
import cards, {
  EquipmentKart,
  MoneyKart,
  myCard,
  PotionKart,
} from "../InMemory";
import MainCardStructure from "../GameCard/MainCardStructure";
import { CardButton } from "../Reusables/CardComponent";
import { AttackBox } from "./AttackBox";

let allCards = [...cards];

const defaultCard = new myCard(
  -1,
  "no-name",
  0,
  process.env.PUBLIC_URL + `game/background.jpeg`,
);

export function Table({ children }) {
  return <div className={"table"}>{children}</div>;
}

export function CurrentCard({
  gamer,
  setGamer,
  setSelectedEquipment,
  gameEngine,
}) {
  const [selectedCard, setSelectedCard] = useState(defaultCard);
  const [isOpen, setStateOpen] = useState(false);
  const [isHidden, setHiddenState] = useState(true);

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
  function HandleAttack() {
    setHiddenState((old) => !old);
  }
  function onAttack(monster, equipment) {
    setHiddenState(true);
    gameEngine.Attack(
      gamer,
      setGamer,
      equipment,
      setSelectedEquipment,
      monster,
    );
    setSelectedCard(defaultCard);
    setStateOpen(false);
  }

  const cardType = gameEngine.GetBtnProp(
    selectedCard,
    HandleAttack,
    handleMoneyTake,
    drinkPotion,
  );

  return (
    <div className={"pozisyon"}>
      <MainCardStructure selectedCard={selectedCard} />
      {isOpen && !(selectedCard instanceof EquipmentKart) && (
        <CardButton onClick={() => cardType.handleFunction(selectedCard)}>
          {cardType.name}
        </CardButton>
      )}
      {isOpen && selectedCard instanceof EquipmentKart && (
        <div>
          <CardButton
            className={
              gamer.money >= selectedCard.cost
                ? "kartButton"
                : "kartButtonDisabled"
            }
            onClick={() => Buy(selectedCard)}
            disabled={gamer.money < selectedCard.cost}
          >
            Buy
          </CardButton>

          <CardButton onClick={() => DontBuy(selectedCard)}>
            Dont Buy
          </CardButton>
        </div>
      )}
      {isOpen || <CardButton onClick={select}>Show</CardButton>}
      {isHidden || (
        <AttackBox
          gameEngine={gameEngine}
          onAttack={onAttack}
          monster={selectedCard}
          gamer={gamer}
        >
          <div
            style={{
              height: "42rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <MainCardStructure selectedCard={selectedCard}></MainCardStructure>
          </div>
        </AttackBox>
      )}
    </div>
  );
}
