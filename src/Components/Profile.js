function Gamer() {
  return (
    <div className={"gamer"}>
      <img
        src={"game/bomb.png"}
        alt={"gamer_profile"}
        style={{ width: "10rem" }}
      />
      <h2>Name</h2>
      <HealthBar />
      <div>Money</div>
      <select>
        <option>Equipment1</option>
        <option>Equipment2</option>
        <option>Equipment3</option>
      </select>
    </div>
  );
}

function HealthBar() {
  return (
    <>
      <div className={"healthBar"}>
        <div className={"bar"}>
          <div className={"hit"}></div>
        </div>
      </div>
      <div className={"shieldBar"}>
        <div className={"bar"}>
          <div className={"hit"}></div>
        </div>
      </div>
    </>
  );
}

export default Gamer;
