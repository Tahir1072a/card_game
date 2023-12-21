import "../Css/kart.css";
import Card from "./Card";
import React, { Suspense, useState } from "react";
import "./InMemory";
import "boxicons";

import cards, {
  EquipmentKart,
  MoneyKart,
  MonsterKart,
  myCard,
  PotionKart,
} from "./InMemory";
import { EquipmentImg, GamerEquipmentGroup } from "./Profile";

let allCards = [...cards];
const defaultCard = new myCard(
  -1,
  "default",
  "no-name",
  0,
  process.env.PUBLIC_URL + `game/background.jpeg`
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
      monster
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
          <CardButtons onClick={() => HandleAttack(selectedCard)}>
            Attack
          </CardButtons>
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
      {isHidden || (
        <AttackBox>
          <SelectEquipment
            equipments={gamer.equipments}
            onAttack={onAttack}
            monster={selectedCard}
          />
          <div
            style={{
              height: "42rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <Card selectedCard={selectedCard}></Card>
          </div>
        </AttackBox>
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

export function AttackBox({ children }) {
  return <div className="attack-box">{children}</div>;
}

function SelectEquipment({ equipments, onAttack, monster }) {
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
        <Card selectedCard={equipments[currentIndex]}></Card>

        <div className="equipment-buttons">
          <div onClick={handleBack} className="icon">
            <box-icon
              style={{ fill: "#fff" }}
              name="chevron-left"
              className="prev-icon"
            ></box-icon>
          </div>
          <button
            onClick={() => onAttack(monster, equipments[currentIndex])}
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
