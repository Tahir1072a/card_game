import "../Css/kart.css";
import Card from "./Card";
import { useState } from "react";
import "./InMemory";
import cards from "./InMemory";

let allCards = [...cards];
const defaultCard = allCards[0][0];
function Table() {
  return (
    <div className={"table"}>
      <Pozisyon />
      <Pozisyon />
      <Pozisyon />
      <Pozisyon />
    </div>
  );
}

function Pozisyon() {
  const [selectedCard, setSelectedCard] = useState(defaultCard);

  function select() {
    if (allCards.length < 1) {
      alert("Oyun Bitti Kazandınız!");
      window.location.reload();
      return;
    }

    const typeIndex = Math.floor(Math.random() * allCards.length);
    const cardIndex = Math.floor(Math.random() * allCards[typeIndex].length);

    setSelectedCard(allCards[typeIndex][cardIndex]);
    allCards = allCards
      .map((p) => p.filter((s) => s !== allCards[typeIndex][cardIndex]))
      .filter((k) => k.length > 0);
  }
  return (
    <div className={"pozisyon"}>
      <Card selectedCard={selectedCard} />
      <button onClick={() => select()} className={"kartButton"}>
        Show
      </button>
    </div>
  );
}

export default Table;
