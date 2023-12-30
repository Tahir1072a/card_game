import "../../Css/kart.css";
export function EquipmentCardStructure({
  power,
  bonus_text,
  cost,
  talk,
  zIndex = 0,
  class_name = {},
}) {
  return (
    <div className={`bottom ${class_name}`} style={{ zIndex: zIndex }}>
      <div className="bonus">{bonus_text}</div>
      <p className="talk">{talk}</p>
      <div className="posions">
        <span className="posion">Power :{power}</span>{" "}
        <span className="posion">Cost: {cost}</span>
      </div>
    </div>
  );
}
