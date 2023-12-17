import { Gamer } from "./InMemory";
import "../Css/kart.css";
import { useState } from "react";

function GamerProfile({ gamer }) {
  return (
    <div className={"gamer"}>
      <div className="top">
        <img
          src={gamer.pngUrl}
          alt={"gamer_profile"}
          style={{ width: "7rem", borderRadius: "50%" }}
        />

        <div>
          <h2 className="gamer-name">{gamer.name}</h2>
          <HealthBar health={gamer.health} shield={gamer.shield} />
        </div>
      </div>

      <div className="moves">
        <div className="equipment">
          <div>Equipment</div>

          <select className="select">
            {gamer.equipments.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="gamer-money">Balance: ${gamer.money}</div>
      </div>
    </div>
  );
}

function HealthBar({ health, shield }) {
  const [hit, setHit] = useState(0);

  return (
    <div className="stats">
      <div className={"Bar"} style={{ width: "17rem" }}>
        <div className={"healthBar"}>
          <div className={"hit"} style={{ width: `${hit - shield}rem` }}></div>
        </div>
      </div>

      {/*burası shieldBar için */}

      <div className={"Bar"}>
        <div className={"shieldBar"}>
          <div className={"hit"} style={{ width: `${hit}rem` }}></div>
        </div>
      </div>
    </div>
  );
}

export default GamerProfile;
