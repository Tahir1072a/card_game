import { Gamer } from "./InMemory";
import "../Css/kart.css";
import { useState } from "react";

function GamerProfile({ gamer }) {
  return (
    <div className={"gamer"}>
      <div className="gamer-top-context">
        <img
          src={gamer.pngUrl}
          alt={"gamer_profile"}
          style={{ width: "100%", marginBottom: "5px" }}
        />
      </div>

      <div className="gamer-bottom-context">
        <h2
          className="gamer-name"
          style={{ gridArea: "title", textAlign: "center" }}
        >
          {gamer.name}
        </h2>

        <HealthBar health={gamer.health} shield={gamer.shield} />

        <div className="moves">
          <div className="gamer-money">Balance: ${gamer.money}</div>

          <div className="equipment">
            <select className="select">
              {gamer.equipments.map((p, i) => (
                <option key={i} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function HealthBar({ health, shield }) {
  const [hit, setHit] = useState(0);

  return (
    <div className="stats">
      <div className="bar-container">
        <div style={{ fontSize: "13px", fontWeight: "500" }}>Health</div>
        <div className={"Bar"} style={{ width: "14rem" }}>
          <div className={"healthBar"}>
            <div
              className={"hit"}
              style={{ width: `${hit - shield}rem` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bar-container">
        <div style={{ fontSize: "13px", fontWeight: "500" }}>Shield</div>
        <div className={"Bar"} style={{ width: "17rem" }}>
          <div className={"shieldBar"}>
            <div className={"hit"} style={{ width: `${hit}rem` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamerProfile;
