export class Gamer {
  constructor(id, name, equipments, health, shield, money, pngUrl) {
    this.id = id;
    this.name = name;
    this.equipments = equipments;
    this.health = health;
    this.shield = shield;
    this.money = money;
    this.pngUrl = pngUrl;
  }
}

export class myCard {
  constructor(id, type, name, copyCount, pngUrl) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.copyCount = copyCount;
    this.pngUrl = pngUrl;
  }
}

export class EquipmentKart extends myCard {
  constructor(id, type, name, power, bonus, talk, cost, copyCount, pngUrl) {
    super(id, type, name, copyCount, pngUrl);
    this.power = power;
    this.bonus = bonus;
    this.cost = cost;
    this.talk = talk;
  }
}

export class MoneyKart extends myCard {
  constructor(id, type, name, gain, talk, copyCount, pngUrl) {
    super(id, type, name, copyCount, pngUrl);
    this.gain = gain;
    this.talk = talk;
  }
}

export class PotionKart extends myCard {
  constructor(
    id,
    type,
    name,
    healthGain,
    moneyGain,
    talk,
    bonus,
    copyCount,
    pngUrl,
  ) {
    super(id, type, name, copyCount, pngUrl);
    this.healthGain = healthGain;
    this.moneyGain = moneyGain;
    this.talk = talk;
    this.bonus = bonus;
  }
}

export class MonsterKart extends myCard {
  constructor(
    id,
    type,
    name,
    attack,
    health,
    shield,
    bonus,
    talk,
    copyCount,
    pngUrl,
  ) {
    super(id, type, name, copyCount, pngUrl);
    this.attack = attack;
    this.health = health;
    this.shield = shield;
    this.bonus = bonus;
    this.talk = talk;
  }
}
// İksirler
const canIksir = new PotionKart(
  0,
  "Potion",
  "Can İksiri",
  2,
  0,
  "leziz bir içecek",
  "Nope",
  2,
  process.env.PUBLIC_URL + `game/health.jpg`,
);

const potion2 = new PotionKart(
  1,
  "Potion",
  "Uyuşukluk İksiri",
  0,
  -2,
  "Ah buda ne!",
  "Nope",
  2,
  process.env.PUBLIC_URL + `game/numbness.jpg`,
);

const potion3 = new PotionKart(
  2,
  "Potion",
  "Güç İksiri",
  1,
  2,
  "Gençleştim resmen bu kadar mı fark eder",
  "Nope",
  3,
  process.env.PUBLIC_URL + `game/power.jpg`,
);

const potion4 = new PotionKart(
  3,
  "Potion",
  "Ekipman İksiri",
  0,
  5,
  "Okey",
  "Nope",
  1,
  process.env.PUBLIC_URL + `game/equipment.jpg`,
);

const potion5 = new PotionKart(
  4,
  "Potion",
  "Zehir",
  -5,
  -2,
  "poisoned",
  "Nope",
  2,
  process.env.PUBLIC_URL + `game/posion.jpg`,
);

// Ekipmanlar
const equipment1 = new EquipmentKart(
  0,
  "Equipment",
  "Kısa Kılıç",
  2,
  0,
  "Kısa kılıç ile hızlı ve etkili bir saldırı!",
  3,
  1,
  process.env.PUBLIC_URL + `game/short_sword.jpg`,
);

const equipment2 = new EquipmentKart(
  1,
  "Equipment",
  "Uzun Kılıç",
  3,
  2,
  "Güçlü ve keskin uzun kılıç!",
  1,
  1,
  process.env.PUBLIC_URL + `game/long_sword.jpeg`,
);

const equipment3 = new EquipmentKart(
  2,
  "Equipment",
  "Kısa Balta",
  4,
  1,
  "Kısa baltayla hızlıca işleri halledin!",
  2,
  1,
  process.env.PUBLIC_URL + `game/short_axe.jpg`,
);

const equipment4 = new EquipmentKart(
  3,
  "Equipment",
  "Uzun Balta",
  5,
  3,
  "Güçlü ve etkili bir uzun baltaya sahip olun!",
  3,
  1,
  process.env.PUBLIC_URL + `game/long_axe.jpg`,
);

const equipment5 = new EquipmentKart(
  4,
  "Equipment",
  "Topuz",
  5,
  5,
  "Topuzla rakiplerinizi ezin!",
  4,
  1,
  process.env.PUBLIC_URL + `game/topuz.jpg`,
);

const equipment6 = new EquipmentKart(
  5,
  "Equipment",
  "Tüfek",
  7,
  100,
  "Uzaktan saldırı için güçlü bir tüfek!",
  5,
  1,
  process.env.PUBLIC_URL + `game/rifle.jpeg`,
);

const equipment7 = new EquipmentKart(
  6,
  "Equipment",
  "Bomba",
  10,
  100,
  "Patlayıcı bir bomba!",
  6,
  1,
  process.env.PUBLIC_URL + `game/dinamit.jpeg`,
);

// Para Kartları
const money1 = new MoneyKart(
  0,
  "Money",
  "Boş Sandık",
  0,
  "Bu sandık boş görünüyor.",
  2,
  process.env.PUBLIC_URL + `game/empty_chest.jpg`,
);

const money2 = new MoneyKart(
  1,
  "Money",
  "Para",
  1,
  "Bir para birimi.",
  3,
  process.env.PUBLIC_URL + `game/coin.jpg`,
);

const money3 = new MoneyKart(
  2,
  "Money",
  "Para Kesesi",
  2,
  "Çok sayıda para içeren bir kesek.",
  2,
  process.env.PUBLIC_URL + `game/money_purse.jpg`,
);

const money4 = new MoneyKart(
  3,
  "Money",
  "Küçük Sandık",
  3,
  "Küçük bir sandık, içi değerli olabilir.",
  2,
  process.env.PUBLIC_URL + `game/small_chest.jpg`,
);

const money5 = new MoneyKart(
  4,
  "Money",
  "Büyük Sandık",
  5,
  "Büyük ve ağır bir sandık.",
  1,
  process.env.PUBLIC_URL + `game/big_chest.jpg`,
);

// Canavarlar

const monster1 = new MonsterKart(
  0,
  "Monster",
  "Tofu",
  2,
  1,
  0,
  3,
  "Merhaba, ben Tofu!",
  3,
  process.env.PUBLIC_URL + `game/tofu.jpeg`,
);

const monster2 = new MonsterKart(
  1,
  "Monster",
  "Tolp",
  3,
  2,
  1,
  2,
  "Ben Tolp, dikkatli ol!",
  2,
  process.env.PUBLIC_URL + `game/tolp.jpeg`,
);

const monster3 = new MonsterKart(
  2,
  "Monster",
  "Sayko",
  7,
  1,
  0,
  1,
  "Sayko burada, kimse bana yaklaşmasın!",
  1,
  process.env.PUBLIC_URL + `game/sayko.jpg`,
);

const monster4 = new MonsterKart(
  3,
  "Monster",
  "Koska",
  5,
  4,
  2,
  3,
  "Koska, güçlü bir rakip!",
  1,
  process.env.PUBLIC_URL + `game/koska.jpg`,
);

const monster5 = new MonsterKart(
  4,
  "Monster",
  "Tom",
  3,
  7,
  2,
  1,
  "Ben Tom, savaşmak benim işim!",
  1,
  process.env.PUBLIC_URL + `game/tom.jpg`,
);

const monster6 = new MonsterKart(
  5,
  "Monster",
  "Jerry",
  5,
  3,
  7,
  1,
  "Jerry, sinsi bir rakip!",
  1,
  process.env.PUBLIC_URL + `game/jerry.jpg`,
);

const monster7 = new MonsterKart(
  6,
  "Monster",
  "Cerberus",
  6,
  3,
  0,
  2,
  "Cerberus, üç başlı bir yaratık!",
  1,
  process.env.PUBLIC_URL + `game/cerberus.jpg`,
);

const monster8 = new MonsterKart(
  7,
  "Monster",
  "Simurg",
  9,
  4,
  0,
  1,
  "Simurg, efsanevi bir yaratık!",
  1,
  process.env.PUBLIC_URL + `game/simurg.jpg`,
);

const monster9 = new MonsterKart(
  8,
  "Monster",
  "Golem",
  2,
  5,
  10,
  2,
  "Ben Golem, taş gibi güçlüyüm!",
  2,
  process.env.PUBLIC_URL + `game/golem.jpg`,
);

const monster10 = new MonsterKart(
  9,
  "Monster",
  "Minator",
  4,
  5,
  1,
  2,
  "Minator burada, savaşa hazırım!",
  2,
  process.env.PUBLIC_URL + `game/minator.jpg`,
);

const Potions = [canIksir, potion2, potion3, potion4, potion5];
export const Equipments = [
  equipment1,
  equipment2,
  equipment3,
  equipment4,
  equipment5,
  equipment6,
  equipment7,
];
const Moneys = [money1, money2, money3, money4, money5];
export const Monsters = [
  monster1,
  monster2,
  monster3,
  monster4,
  monster5,
  monster6,
  monster7,
  monster8,
  monster9,
  monster10,
];

const cards = [Potions, Equipments, Moneys, Monsters];

export default cards;
