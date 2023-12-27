import "../../Css/kart.css";
export function EquipmentCardStructure({
  power,
  bonus,
  cost,
  talk,
  zIndex = 0,
  className = {},
}) {
  return (
    <div className={`bottom ${className}`} style={{ zIndex: zIndex }}>
      <div className="bonus">
        Remove all exhaustion tokens from this unit at the end of each round.
      </div>
      <p className="talk">{talk}</p>
      <div className="posions">
        <span className="posion">Power :{power}</span>{" "}
        <span className="posion">Cost: {cost}</span>
      </div>
    </div>
  );
}
