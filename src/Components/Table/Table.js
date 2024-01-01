import "../../Css/kart.css";
import React, { useEffect, useState } from "react";
import { EquipmentKart, MoneyKart, myCard, PotionKart } from "../InMemory";
import MainCardStructure from "../GameCard/MainCardStructure";
import { CardButton } from "../Reusables/CardComponent";
import { AttackBox } from "./AttackBox";

const defaultCard = new myCard(
  -1,
  "no-name",
  0,
  process.env.PUBLIC_URL + `game/background.jpeg`,
);

const potion5 = new PotionKart(
  4,
  "Zehir",
  -5,
  -2,
  "poisoned",
  2,
  process.env.PUBLIC_URL + `game/posion.jpg`,
);

export function Table({ children }) {
  return <div className={"table"}>{children}</div>;
}

export function CurrentCard({
  gamer,
  setGamer,
  setSelectedEquipment,
  gameEngine,
  round,
  setRound,
  all_cards,
  setAllCards,
}) {
  const [selectedCard, setSelectedCard] = useState(defaultCard);
  const [isOpen, setStateOpen] = useState(false);
  const [isHidden, setHiddenState] = useState(true);

  useEffect(() => {
    if (all_cards.length < 1) {
      return;
    }
    gameEngine.CardBonusCycle(
      selectedCard,
      setSelectedCard,
      all_cards,
      potion5,
    );
  }, [round]);

  function select() {
    if (all_cards.length < 1) {
      alert("Oyun Bitti Kazandınız!");
      window.location.reload();
      return;
    }

    const typeIndex = Math.floor(Math.random() * all_cards.length);
    const cardIndex = Math.floor(Math.random() * all_cards[typeIndex].length);

    setStateOpen(true);
    setSelectedCard(all_cards[typeIndex][cardIndex]);
    if (all_cards[typeIndex][cardIndex].copyCount <= 1) {
      setAllCards(
        all_cards
          .map((p) => p.filter((s) => s !== all_cards[typeIndex][cardIndex]))
          .filter((k) => k.length > 0),
      );
      // all_cards = all_cards
      //     .map((p) => p.filter((s) => s !== all_cards[typeIndex][cardIndex]))
      //     .filter((k) => k.length > 0);
    } else {
      all_cards[typeIndex][cardIndex].copyCount += -1;
    }

    setRound((old) => old + 1);
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
