import "../Css/kart.css";

export function GamerProfile({
  gamer,
  selectedEquipment,
  setSelectedEquipment,
  gameEngine,
}) {
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

export function GamerEquipmentGroup({ gamer }) {
  return (
    <div style={{ display: "flex" }}>
      {gamer.equipments.map((p) => (
        <EquipmentImg key={p.id} equipment={p} />
      ))}
    </div>
  );
}
export function EquipmentImg({ equipment }) {
  return (
    <img
      style={{
        height: "4rem",
        width: "4rem",
        borderRadius: "50%",
        marginRight: "0.2rem",
        border: "0.3rem solid blue",
      }}
      src={equipment.pngUrl}
      alt={equipment.name}
    />
  );
}
function Bar({ health, shield }) {
  const maxHealth = 19;

  return (
    <div className="bars">
      <BarContainer barName={"Health"}>
        <HealthBar maxHealth={maxHealth} health={health} />
      </BarContainer>
      <BarContainer barName={"Shield"}>
        <ShieldBar maxHealth={maxHealth} shield={shield} />
      </BarContainer>
    </div>
  );
}
function BarContainer({ barName, children }) {
  return (
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
        {barName}
      </div>
      {children}
    </div>
  );
}

function HealthBar({ maxHealth, health }) {
  return (
    <div className={"Bar"} style={{ width: "15rem" }}>
      <div className={"healthBar"}>
        <div
          className={"hit"}
          style={{ width: `${(maxHealth - health) * (15 / 19)}rem` }}
        ></div>
      </div>
    </div>
  );
}

function ShieldBar({ maxHealth, shield }) {
  return (
    <div className={"Bar"}>
      <div className={"shieldBar"}>
        <div
          className={"hit"}
          style={{ width: `${maxHealth - shield}rem` }}
        ></div>
      </div>
    </div>
  );
}
