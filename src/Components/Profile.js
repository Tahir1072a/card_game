import { Gamer } from "./InMemory";
import "../Css/kart.css";
import { useState } from "react";

function GamerProfile({ gamer }) {
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

      <HealthBar health={gamer.health} shield={gamer.shield} />

      <div className="balance">Money: ${gamer.money}</div>

      <select className="select">
        {gamer.equipments.map((p, i) => (
          <option key={i} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
}

function HealthBar({ health, shield }) {
  const [hit, setHit] = useState(0);

  return (
    <div className="bars">
      <div className="bar-container">
        <div
          style={{
            textTransform: "uppercase",
            fontSize: "1.1rem",
            fontWeight: "500",
            color: "white",
            marginLeft: "2px",
          }}
        >
          Health
        </div>
        <div className={"Bar"} style={{ width: "15rem" }}>
          <div className={"healthBar"}>
            <div
              className={"hit"}
              style={{ width: `${hit - shield}rem` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bar-container">
        <div
          style={{
            textTransform: "uppercase",
            fontSize: "1.1rem",
            fontWeight: "500",
            color: "white",
            marginLeft: "2px",
          }}
        >
          Shield
        </div>
        <div className={"Bar"}>
          <div className={"shieldBar"}>
            <div className={"hit"} style={{ width: `${hit}rem` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamerProfile;
