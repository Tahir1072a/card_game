import "../../Css/kart.css";
import { GamerEquipmentGroup } from "./GamerEquipments";
import { Bar } from "./GamerBars";

export function GamerProfile({ gamer }) {
  return (
    <div className={"gamer"}>
      <div className="gamer-profile">
        <img
          src={gamer.pngUrl}
          alt={"gamer_profile"}
          style={{ width: "5rem", borderRadius: "5rem" }}
        />
        <h2 style={{ textTransform: "uppercase", color: "white" }}>
          {gamer.name}
        </h2>
      </div>

      <Bar health={gamer.health} shield={gamer.shield} />

      <div className="balance">Money: ${gamer.money}</div>
      <GamerEquipmentGroup gamer={gamer} />
    </div>
  );
}
