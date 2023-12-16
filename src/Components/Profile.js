import { Gamer } from "./InMemory";
import "../Css/kart.css";
import { useState } from "react";

const gamer = new Gamer(
  0,
  "Tahiri",
  ["Yumruk"],
  19,
  19,
  1,
  process.env.PUBLIC_URL + `game/avatar1.jpeg`,
);

function GamerProfile() {
  return (
    <div className={"gamer"}>
      <img
        src={gamer.pngUrl}
        alt={"gamer_profile"}
        style={{ width: "10rem" }}
      />
      <h2>{gamer.name}</h2>
      <HealthBar health={gamer.health} shield={gamer.shield} />
      <div>{gamer.money}</div>
      <select>
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
    <>
      <div className={"healthBar"}>
        <div className={"bar"}>
          <div className={"hit"} style={{ width: `${hit - shield}rem` }}></div>
        </div>
      </div>
      {/*burası shieldBar için */}

      <div className={"shieldBar"}>
        <div className={"bar"}>
          <div className={"hit"} style={{ width: `${hit}rem` }}></div>
        </div>
      </div>
    </>
  );
}

export default GamerProfile;
