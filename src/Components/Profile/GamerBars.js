import "../../Css/kart.css";
export function Bar({ health, shield }) {
  const maxHealth = 19;
  console.log(shield);
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
    <div className={"Bar"} style={{ width: "15.5rem" }}>
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
