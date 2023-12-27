import "../../Css/kart.css";
import { useState } from "react";
import { EquipmentCardStructure } from "../GameCard/EquipmentCardStructure";

export function GamerEquipmentGroup({ gamer }) {
  return (
    <div className="main-equipment">
      {gamer.equipments.map((p) => (
        <EquipmentImg key={p.id} equipment={p} mightHover={true} />
      ))}
    </div>
  );
}
export function EquipmentImg({ equipment, mightHover = false }) {
  const [isEnter, setIsEnter] = useState(false);
  function onEnter() {
    setIsEnter(true);
  }
  function onLeave() {
    setIsEnter(false);
  }

  return (
    <div
      className="profile-equipment"
      onMouseEnter={mightHover ? onEnter : () => {}}
      onMouseLeave={mightHover ? onLeave : () => {}}
    >
      <img
        className="equipment-img"
        src={equipment.pngUrl}
        alt={equipment.name}
      ></img>
      {isEnter && (
        <div
          style={{
            marginTop: "5.5rem",
            width: "30rem",
          }}
        >
          <EquipmentCardStructure
            power={equipment.power}
            cost={equipment.cost}
            talk={equipment.talk}
            zIndex={10}
            className={"border"}
          />
        </div>
      )}
    </div>
  );
}
