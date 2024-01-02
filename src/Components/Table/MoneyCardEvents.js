import { MoneyKart } from "../InMemory";
import { CardButton } from "../Reusables/CardComponent";
import React from "react";

export default function MoneyCardEvents({
  selectedCard,
  gameEngine,
  setGamer,
  resetCard,
  isGamerAttack,
}) {
  function HandleTake() {
    if (selectedCard instanceof MoneyKart) {
      gameEngine.SetMoney(setGamer, selectedCard.gain);
    }
    resetCard();
  }

  return (
    <CardButton
      onClick={() => HandleTake()}
      disabled={isGamerAttack}
      className={isGamerAttack ? "kartButtonDisabled" : ""}
    >
      Take
    </CardButton>
  );
}
