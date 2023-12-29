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
        {/* Nasıl Oynanır */}
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
            <div>
              Oyuna masanın üstünde duran{" "}
              <span className="private-words">
                {gameInfo.gamePathNum} kapalı karttan
              </span>{" "}
              biri seçilerek başlanır.{" "}
              <span className="private-words">Oyundaki amaç</span> her açtığımız
              kartı karşılayabilmek ve ölmeden masadaki{" "}
              <span className="private-words">tüm kartları bitirmektir</span>.
              Eğer canımız bitmeden kartlar biterse oyuncu oyunu kazanmış olur.
            </div>
          </p>
        </div>

        {/* Kart Çeşitleri */}
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
            <div>
              Oyunda {gameInfo.gameCardTypeNum} çeşit kart türü vardır. Bunlar{" "}
              <span className="private-words">
                Monster, Ekipman, Potion(İksir)
              </span>{" "}
              ve <span className="private-words">Money(Para)</span> kartlarıdır.
              Bu türlerde bulunan her kartın farklı özellikleri vardır. Bu
              özellikler kartın üzerinde yazmakta ve oyuncu bundan hareketle
              seçimlerini yapmalıdır. Aşağıda küçük bir örnek verilmiştir.
            </div>
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: "60rem", margin: "1rem 0" }}
              src={gameInfo.informationCardTypeImg}
              alt={"info"}
            />
          </div>

          <p className="popup-p-tag">
            <box-icon
              name="right-arrow-circle"
              style={{ fill: "#f9db9c" }}
            ></box-icon>
            <div>
              Görüldüğü üzere ekipman kartının üstünde{" "}
              <span className="private-words">Maliyeti(cost)</span> ve{" "}
              <span className="private-words">Gücü(power)</span> yazmaktadır.
              Aynı şekilde monster kartının üzerinde de{" "}
              <span className="private-words">Shield(kalkan)</span> vb. olmak
              üzere özellikler yazar.
            </div>
          </p>
        </div>

        {/* Oyun Mekaniği */}
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
            <div>
              Oyunda seçim yapılan kartların özellikleri{" "}
              <span className="private-words">oyuncu</span> üzerine etki eder ve
              oyun bu şekilde devam eder.{" "}
            </div>
          </p>

          <p className="popup-p-tag">
            <box-icon
              name="right-arrow-circle"
              style={{ marginRight: "0.9rem", fill: "#f9db9c" }}
            ></box-icon>
            <div>
              Oyundaki <span className="private-words">savaş mekaniği</span> şu
              şekildedir : Oyuncunun elinde ekipman varsa ilgili ekipman
              monster’ı yenebilecek güçte ise <span>(kalkan + canı)</span> o
              zaman ekipman <span className="private-words">harcanır</span> ve{" "}
              <span className="private-words">monster yenilir</span>. Ancak gücü
              yetersiz gelirse{" "}
              <span className="private-words">ekipman harcanmaz</span> ve
              oyuncunun monster’ın gücü kadar{" "}
              <span className="private-words">canı veya kalkanı azalır</span>.
            </div>
          </p>

          <p className="popup-p-tag">
            <box-icon
              name="right-arrow-circle"
              style={{ marginRight: "0.9rem", fill: "#f9db9c" }}
            ></box-icon>
            <div>
              Oyuncunun yeterli parası olduğu sürece çıkan kartlardan ekipman
              almaya devam edebilir.{" "}
            </div>
          </p>

          <p className="popup-p-tag">
            <box-icon
              name="right-arrow-circle"
              style={{ marginRight: "0.9rem", fill: "#f9db9c" }}
            ></box-icon>
            <div>
              Bu yazı size karmaşık geldiyse endişelenmeyin, oyun mantığı
              basittir ve bir iki tür oynadıktan sonra rahat bir şekilde
              kavrayacaksınız.
            </div>
          </p>
        </div>
      </main>
    </div>
  );
}
