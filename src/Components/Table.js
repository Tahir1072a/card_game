import "../Css/kart.css";
import Card from "./Card";
import { useState } from "react";
import "./InMemory";
import cards from "./InMemory";

const allCards = [...cards];

function Table() {
  const [typeIndexer, setTypeIndexer] = useState([0, 0, 0, 0]);
  const [chosenCardIndex, setChosenCardIndex] = useState([0, 0, 0, 0]);
  const selectedCards = typeIndexer.map(
    (i, index) => allCards[i][chosenCardIndex[index]],
  );

  function select(index) {
    const typeIndex = Math.floor(Math.random() * allCards.length);
    const cardIndex = Math.floor(Math.random() * allCards[typeIndex].length);

    const newChose = [...chosenCardIndex];
    newChose[index] = cardIndex;
    setChosenCardIndex(newChose);

    const newTypeIndex = [...typeIndexer];
    newTypeIndex[index] = typeIndex;
    setTypeIndexer(newTypeIndex);
  }

  return (
    <div className={"table"}>
      {[0, 1, 2, 3].map((index) => (
        <div className={"pozisyon"} key={index}>
          <Card selectedCard={selectedCards[index]} />
          <button onClick={() => select(index)} className={"kartButton"}>
            Show
          </button>
        </div>
      ))}
    </div>
  );
}

export default Table;
