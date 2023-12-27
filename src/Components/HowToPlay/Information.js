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
        &#x1F6C8;
      </span>

      {isEntered && <InfoPopup />}
    </div>
  );
}

function InfoPopup() {
  const gameInfo = new GameInformation(4, 4, "CardInfo.png");
  return (
    <div
      style={{
        width: "auto",
        height: "auto",
        background: "rgb(204, 204, 204)",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "12",
        top: "15rem",
        right: "0rem",
        overflow: "scroll",
      }}
    >
      <main>
        <div>
          <h1>Nasıl Oynanır?</h1>
          <p>
            ➡️ Oyuna masanın üstünde duran {gameInfo.gamePathNum} kapalı karttan
            biri seçilerek başlanır. Oyundaki amaç her açtığımız kartı
            karşılayabilmek ve ölmeden masadaki tüm kartları bitirmektir. Eğer
            canımız bitmeden kartlar biterse oyuncu oyunu kazanmış olur
          </p>
        </div>
        <div>
          <h2>Kart Çeşitleri</h2>
          <p>
            ➡️ Oyunda {gameInfo.gameCardTypeNum} çeşit kart türü vardır. Bunlar
            Monster, Ekipman, Potion(İksir) ve Money(Para) kartlarıdır. Bu
            türlerde bulunan her kartın farklı özellikleri vardır. Bu özellikler
            kartın üzerinde yazmakta ve oyuncu bundan hareketler seçimlerini
            yapmalıdır. Aşağıda küçük bir örnek verilmiştir.
          </p>
          <img src={gameInfo.informationCardTypeImg} alt={"info"} />
          <p>
            ➡️ Görüldüğü üzere ekipman kartının üstünde Maliyeti(cost) ve
            Gücü(power) yazmaktadır. Aynı şekilde monster kartının üzerinde de
            shield(kalkan) vb. olmak üzere özellikler yazar.
          </p>
        </div>
        <div>
          <h2>Oyun Mekaniği</h2>
          <p>
            ➡️ Oyunda seçim yapılan kartların özellikleri oyuncu üzerine etki
            eder ve oyun bu şekilde devam eder.{" "}
          </p>
          <p>
            ➡️ Oyundaki savaş mekaniği şu şekildedir : Oyuncunun elinde ekipman
            varsa ilgili ekipman monsterı yenebilecek güçte ise(kalkan + canı) o
            zaman ekipman harcanır ve monster yenilir. Ancak gücü yetersiz
            gelirse ekipman harcanmaz ve oyuncunun monster’ın gücü kadar canı
            veya kalkanı azalır.
          </p>
          <p>
            ➡️ Oyuncunun yeterli parası olduğu sürece çıkan kartlardan ekipman
            almaya devam edebilir.{" "}
          </p>
          <p>
            ➡️ Bu yazı size karmaşık geldiyse endişelenmeyin, oyun mantığı
            basittir ve bir iki tür oynadıktan sonra rahat bir şekilde
            kavrayacaksınız.
          </p>
        </div>
      </main>
    </div>
  );
}
