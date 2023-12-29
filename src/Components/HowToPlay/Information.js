import { useState } from "react";

class GameInformation {
  constructor(gamePathNum, gameCardTypeNum, informationCardTypeImg) {
    this.gamePathNum = gamePathNum;
    this.gameCardTypeNum = gameCardTypeNum;
    this.informationCardTypeImg = informationCardTypeImg;
  }
}

export function Information() {
  const [isEntered, setIsEntered] = useState(false);

  function HandleEnterEvent() {
    setIsEntered((old) => !old);
  }

  return (
    <div style={{ fontSize: "3rem" }}>
      <span style={{ cursor: "pointer" }} onClick={HandleEnterEvent}>
        <box-icon
          name="info-circle"
          style={{ fill: "#f9db9c", fontSize: "2rem" }}
        ></box-icon>
      </span>

      {isEntered && <InfoPopup />}
    </div>
  );
}

function InfoPopup() {
  const gameInfo = new GameInformation(4, 4, "CardInfo.png");
  return (
    <div className="info-popup">
      <main>
        <div
          style={{
            marginBottom: "1.5rem",
          }}
        >
          <h1 style={{ color: "#EE9631" }}>Nasıl Oynanır?</h1>

          <p className="popup-p-tag">
            <box-icon
              name="right-arrow-circle"
              style={{ fill: "#f9db9c" }}
            ></box-icon>{" "}
            Oyuna masanın üstünde duran {gameInfo.gamePathNum} kapalı karttan
            biri seçilerek başlanır. Oyundaki amaç her açtığımız kartı
            karşılayabilmek ve ölmeden masadaki tüm kartları bitirmektir. Eğer
            canımız bitmeden kartlar biterse oyuncu oyunu kazanmış olur
          </p>
        </div>

        <div
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: ".3rem",
          }}
        >
          <h2 style={{ color: "#EE9631" }}>Kart Çeşitleri</h2>

          <p className="popup-p-tag">
            <box-icon
              name="right-arrow-circle"
              style={{ fill: "#f9db9c" }}
            ></box-icon>{" "}
            Oyunda {gameInfo.gameCardTypeNum} çeşit kart türü vardır. Bunlar
            Monster, Ekipman, Potion(İksir) ve Money(Para) kartlarıdır. Bu
            türlerde bulunan her kartın farklı özellikleri vardır. Bu özellikler
            kartın üzerinde yazmakta ve oyuncu bundan hareketler seçimlerini
            yapmalıdır. Aşağıda küçük bir örnek verilmiştir.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: "60rem" }}
              src={gameInfo.informationCardTypeImg}
              alt={"info"}
            />
          </div>

          <p className="popup-p-tag">
            <box-icon
              name="right-arrow-circle"
              style={{ fill: "#f9db9c" }}
            ></box-icon>
            Görüldüğü üzere ekipman kartının üstünde Maliyeti(cost) ve
            Gücü(power) yazmaktadır. Aynı şekilde monster kartının üzerinde de
            shield(kalkan) vb. olmak üzere özellikler yazar.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: ".5rem",
          }}
        >
          <h2 style={{ color: "#EE9631", marginBottom: ".5rem" }}>
            Oyun Mekaniği
          </h2>

          <p className="popup-p-tag">
            <box-icon
              name="right-arrow-circle"
              style={{ marginRight: "0.9rem", fill: "#f9db9c" }}
            ></box-icon>
            Oyunda seçim yapılan kartların özellikleri oyuncu üzerine etki eder
            ve oyun bu şekilde devam eder.{" "}
          </p>

          <p className="popup-p-tag">
            <box-icon
              name="right-arrow-circle"
              style={{ marginRight: "0.9rem", fill: "#f9db9c" }}
            ></box-icon>
            Oyundaki savaş mekaniği şu şekildedir : Oyuncunun elinde ekipman
            varsa ilgili ekipman monsterı yenebilecek güçte ise(kalkan + canı) o
            zaman ekipman harcanır ve monster yenilir. Ancak gücü yetersiz
            gelirse ekipman harcanmaz ve oyuncunun monster’ın gücü kadar canı
            veya kalkanı azalır.
          </p>

          <p className="popup-p-tag">
            <box-icon
              name="right-arrow-circle"
              style={{ marginRight: "0.9rem", fill: "#f9db9c" }}
            ></box-icon>
            Oyuncunun yeterli parası olduğu sürece çıkan kartlardan ekipman
            almaya devam edebilir.{" "}
          </p>

          <p className="popup-p-tag">
            <box-icon
              name="right-arrow-circle"
              style={{ marginRight: "0.9rem", fill: "#f9db9c" }}
            ></box-icon>
            Bu yazı size karmaşık geldiyse endişelenmeyin, oyun mantığı basittir
            ve bir iki tür oynadıktan sonra rahat bir şekilde kavrayacaksınız.
          </p>
        </div>
      </main>
    </div>
  );
}
