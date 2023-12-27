import "../../Css/kart.css";
export function PotionCardStructure({ healthGain, moneyGain, talk, bonus }) {
  return (
    <div className="bottom">
      <div className="bonus">
        Remove all exhaustion tokens from this unit at the end of each round.
      </div>
      <p className="talk">{talk}</p>
      <div className="posions">
        <span className="posion health">HealthGain :{healthGain}</span>{" "}
        <span className="posion">MoneyGain: {moneyGain}</span>
      </div>
    </div>
  );
}
