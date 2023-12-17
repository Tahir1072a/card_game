import { EquipmentKart, Gamer } from "./InMemory";
import "../Css/kart.css";
import { useState } from "react";

function GamerProfile({ gamer, selectedEquipment, setEquipment }) {
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

      <select
        className="select"
        value={selectedEquipment.id}
        onChange={(e) => setEquipment(Number(e.target.value))}
      >
        {gamer.equipments.map((p, i) => (
          <option key={i} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function HealthBar({ health, shield }) {
  const maxHealth = 19;

  console.log(health);
  if (health === 0) {
    alert("Game Over! You are dead!");
    window.location.reload();
  }

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
              style={{ width: `${(maxHealth - health) * (15 / 19)}rem` }}
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
            <div
              className={"hit"}
              style={{ width: `${maxHealth - shield}rem` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamerProfile;
