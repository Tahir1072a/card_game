import "../../Css/kart.css";
import React, { useEffect, useReducer, useState } from "react";
import { myCard, PotionKart } from "../InMemory";
import MainCardStructure from "../GameCard/MainCardStructure";
import { CardButton } from "../Reusables/CardComponent";
import { AttackBox } from "./AttackBox";
import MoneyCardEvents from "./MoneyCardEvents";
import PotionCardEvents from "./PotionCardEvents";
import EquipmentsCardEvents from "./EquipmentsCardEvents";
import MonsterCardEvents from "./MonsterCardEvents";

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

const initialState = {
  hiddenAttackBox: true,
  cardType: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "open_new_card":
      return {
        ...state,
        cardType: action.payload,
      };
    case "close_card":
      return {
        ...state,
        cardType: null,
      };
    case "set_hidden_state":
      return {
        ...state,
        hiddenAttackBox: action.payload,
      };
    case "finish_attack":
      return {
        ...state,
        cardType: null,
        hiddenAttackBox: true,
      };
  }
}

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
  deck,
  setDeck,
  isGamerAttack,
  setGamerAttack,
}) {
  const [selectedCard, setSelectedCard] = useState(defaultCard);
  const [{ hiddenAttackBox, cardType }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    gameEngine.CardBonusCycle(
      selectedCard,
      setSelectedCard,
      deck,
      setDeck,
      potion5,
    );
  }, [round]);

  function select() {
    gameEngine.SelectNewCard(setSelectedCard, deck, setDeck, dispatch);
    setRound((old) => old + 1);
  }
  function ResetCard() {
    setSelectedCard(defaultCard);
    dispatch({ type: "close_card" });
  }
  function OpenAttackBox() {
    dispatch({ type: "set_hidden_state", payload: false });
    setGamerAttack(true);
  }
  function onAttack(monster, equipment) {
    gameEngine.Attack(
      gamer,
      setGamer,
      equipment,
      setSelectedEquipment,
      monster,
    );
    dispatch({ type: "finish_attack" });
    setGamerAttack(false);
    setSelectedCard(defaultCard);
  }

  return (
    <div className={"pozisyon"}>
      <MainCardStructure selectedCard={selectedCard} />
      {cardType && cardType === "Monster" && (
        <MonsterCardEvents
          isGamerAttack={isGamerAttack}
          openAttackBox={OpenAttackBox}
        />
      )}
      {cardType && cardType === "Money" && (
        <MoneyCardEvents
          selectedCard={selectedCard}
          resetCard={ResetCard}
          isGamerAttack={isGamerAttack}
          setGamer={setGamer}
          gameEngine={gameEngine}
        />
      )}
      {cardType && cardType === "Potion" && (
        <PotionCardEvents
          gameEngine={gameEngine}
          resetCard={ResetCard}
          isGamerAttack={isGamerAttack}
          setGamer={setGamer}
          selectedCard={selectedCard}
          gamer={gamer}
        />
      )}
      {cardType && cardType === "Equipment" && (
        <EquipmentsCardEvents
          resetCard={ResetCard}
          isGamerAttack={isGamerAttack}
          setGamer={setGamer}
          gameEngine={gameEngine}
          selectedCard={selectedCard}
          gamer={gamer}
        />
      )}
      {cardType ? null : (
        <CardButton
          onClick={select}
          disabled={isGamerAttack}
          className={isGamerAttack ? "kartButtonDisabled" : ""}
        >
          Show
        </CardButton>
      )}
      {hiddenAttackBox || (
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
