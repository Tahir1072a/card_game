import "../../Css/kart.css";
export function MonsterCardStructure({
  attack,
  health,
  shield,
  bonus_text,
  talk,
}) {
  return (
    <div className="bottom">
      <div className="bonus">{bonus_text}</div> <p className="talk">{talk}</p>
      <div className="posions">
        <span className="posion attack">Attack: {attack}</span>{" "}
        <span className="posion shield">Shield :{shield}</span>{" "}
        <span className="posion health">Health :{health}</span>
      </div>
    </div>
  );
}
