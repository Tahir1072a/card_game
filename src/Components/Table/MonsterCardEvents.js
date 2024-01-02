import { CardButton } from "../Reusables/CardComponent";
import React from "react";

export default function MonsterCardEvents({ openAttackBox, isGamerAttack }) {
  function HandleAttack() {
    openAttackBox();
  }

  return (
    <CardButton
      onClick={() => HandleAttack()}
      disabled={isGamerAttack}
      className={isGamerAttack ? "kartButtonDisabled" : ""}
    >
      Attack
    </CardButton>
  );
}
