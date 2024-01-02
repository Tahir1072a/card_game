import { CardButton } from "../Reusables/CardComponent";
import React from "react";
import { EquipmentKart } from "../InMemory";

export default function EquipmentsCardEvents({
  selectedCard,
  gameEngine,
  resetCard,
  setGamer,
  isGamerAttack,
  gamer,
}) {
  function HandleBuy() {
    if (selectedCard instanceof EquipmentKart) {
      gameEngine.AddEquipment(setGamer, selectedCard);
      gameEngine.SetMoney(setGamer, -selectedCard.cost);
    }
    resetCard();
  }
  function HandleDontBuy() {
    resetCard();
  }

  return (
    <div>
      <CardButton
        className={
          gamer.money >= selectedCard.cost && !isGamerAttack
            ? ""
            : "kartButtonDisabled"
        }
        onClick={() => HandleBuy()}
        disabled={gamer.money < selectedCard.cost || isGamerAttack}
      >
        Buy
      </CardButton>

      <CardButton
        className={isGamerAttack ? "kartButtonDisabled" : ""}
        onClick={() => HandleDontBuy()}
        disabled={isGamerAttack}
      >
        Dont Buy
      </CardButton>
    </div>
  );
}
