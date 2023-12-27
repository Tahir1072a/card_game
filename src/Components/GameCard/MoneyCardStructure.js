import "../../Css/kart.css";
export function MoneyCardStructure({ gain, talk }) {
  return (
    <div className="bottom">
      <p className="talk">{talk}</p>
      <div className="posions">
        <span className="posion">Money Gain :{gain}</span>
      </div>
    </div>
  );
}
