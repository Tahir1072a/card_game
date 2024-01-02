import { PotionKart } from "../InMemory";
import { CardButton } from "../Reusables/CardComponent";
import React from "react";

export default function PotionCardEvents({
  selectedCard,
  gameEngine,
  gamer,
  setGamer,
  resetCard,
  isGamerAttack,
}) {
  function HandleDrink() {
    if (selectedCard instanceof PotionKart) {
      gameEngine.SetHealth(gamer, setGamer, selectedCard.healthGain);
      gameEngine.SetMoney(setGamer, selectedCard.moneyGain);
    }
    resetCard();
  }

  return (
    <CardButton
      onClick={() => HandleDrink()}
      disabled={isGamerAttack}
      className={isGamerAttack ? "kartButtonDisabled" : ""}
    >
      Drink
    </CardButton>
  );
}
