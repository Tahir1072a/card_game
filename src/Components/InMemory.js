import { EquipmentTypes, MonsterBonusTypes } from "./BonusTypes";

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
  constructor(id, name, copyCount, pngUrl) {
    this.id = id;
    this.name = name;
    this.copyCount = copyCount;
    this.pngUrl = pngUrl;
  }
}

export class EquipmentKart extends myCard {
  constructor(
    id,
    name,
    power,
    type,
    bonus,
    bonus_text,
    talk,
    cost,
    copyCount,
    pngUrl,
  ) {
    super(id, name, copyCount, pngUrl);
    this.power = power;
    this.type = type;
    this.bonus = bonus;
    this.bonus_text = bonus_text;
    this.cost = cost;
    this.talk = talk;
  }
}

export class MoneyKart extends myCard {
  constructor(id, name, gain, talk, copyCount, pngUrl) {
    super(id, name, copyCount, pngUrl);
    this.gain = gain;
    this.talk = talk;
  }
}

export class PotionKart extends myCard {
  constructor(id, name, healthGain, moneyGain, talk, copyCount, pngUrl) {
    super(id, name, copyCount, pngUrl);
    this.healthGain = healthGain;
    this.moneyGain = moneyGain;
    this.talk = talk;
  }
}

export class MonsterKart extends myCard {
  constructor(
    id,
    name,
    attack,
    health,
    shield,
    bonus_text,
    bonus,
    talk,
    copyCount,
    pngUrl,
  ) {
    super(id, name, copyCount, pngUrl);
    this.attack = attack;
    this.health = health;
    this.shield = shield;
    this.bonus_text = bonus_text;
    this.bonus = bonus;
    this.talk = talk;
  }
}
// İksirler
const canIksir = new PotionKart(
  0,
  "Can İksiri",
  2,
  0,
  "leziz bir içecek",
  2,
  process.env.PUBLIC_URL + `game/health.jpg`,
);

const potion2 = new PotionKart(
  1,
  "Uyuşukluk İksiri",
  0,
  -2,
  "Ah buda ne!",
  2,
  process.env.PUBLIC_URL + `game/numbness.jpg`,
);

const potion3 = new PotionKart(
  2,
  "Güç İksiri",
  1,
  2,
  "Gençleştim resmen bu kadar mı fark eder",
  2,
  process.env.PUBLIC_URL + `game/power.jpg`,
);

const potion4 = new PotionKart(
  3,
  "Ekipman İksiri",
  0,
  5,
  "Okey",
  1,
  process.env.PUBLIC_URL + `game/equipment.jpg`,
);

const potion5 = new PotionKart(
  4,
  "Zehir",
  -5,
  -2,
  "poisoned",
  1,
  process.env.PUBLIC_URL + `game/posion.jpg`,
);

// Ekipmanlar
const equipment1 = new EquipmentKart(
  0,
  "Kısa Kılıç",
  2,
  EquipmentTypes.LIGHT,
  0,
  "Normal bir kılıç",
  "Kısa kılıç ile hızlı ve etkili bir saldırı yap!",
  1,
  3,
  process.env.PUBLIC_URL + `game/short_sword.jpg`,
);

const equipment2 = new EquipmentKart(
  1,
  "Uzun Kılıç",
  3,
  EquipmentTypes.LIGHT,
  2,
  "Kalkanlara +2 fazladan vurur",
  "Güçlü ve keskin uzun kılıç!",
  2,
  2,
  process.env.PUBLIC_URL + `game/long_sword.jpeg`,
);

const equipment3 = new EquipmentKart(
  2,
  "Kısa Balta",
  4,
  EquipmentTypes.LIGHT,
  1,
  "Kalkanlara +1 fazladan vurur",
  "Kısa baltayla hızlıca işleri halledin!",
  2,
  2,
  process.env.PUBLIC_URL + `game/short_axe.jpg`,
);

const equipment4 = new EquipmentKart(
  3,
  "Uzun Balta",
  5,
  EquipmentTypes.MEDIUM,
  3,
  "Kalkanlara +3 fazladan vurur",
  "Güçlü ve etkili bir uzun baltaya sahip olun!",
  3,
  2,
  process.env.PUBLIC_URL + `game/long_axe.jpg`,
);

const equipment5 = new EquipmentKart(
  4,
  "Topuz",
  5,
  EquipmentTypes.MEDIUM,
  5,
  "Kalkanlara +5 fazladan vurur",
  "Topuzla rakiplerinizi ezin!",
  3,
  2,
  process.env.PUBLIC_URL + `game/topuz.jpg`,
);

const equipment6 = new EquipmentKart(
  5,
  "Tüfek",
  7,
  EquipmentTypes.HEAVY,
  -1,
  "Düşman kalkanlarını yok sayar!",
  "Uzaktan saldırı için güçlü bir tüfek!",
  4,
  1,
  process.env.PUBLIC_URL + `game/rifle.jpeg`,
);

const equipment7 = new EquipmentKart(
  6,
  "Bomba",
  10,
  EquipmentTypes.HEAVY,
  -1,
  "Düşman kalkanlarını yok sayar",
  "Patlayıcı bir bomba!",
  5,
  1,
  process.env.PUBLIC_URL + `game/dinamit.jpeg`,
);

// Para Kartları
const money1 = new MoneyKart(
  0,
  "Boş Sandık",
  0,
  "Bu sandık boş görünüyor.",
  2,
  process.env.PUBLIC_URL + `game/empty_chest.jpg`,
);

const money2 = new MoneyKart(
  1,
  "Para",
  1,
  "Bir para birimi.",
  3,
  process.env.PUBLIC_URL + `game/coin.jpg`,
);

const money3 = new MoneyKart(
  2,
  "Para Kesesi",
  2,
  "Çok sayıda para içeren bir kesek.",
  2,
  process.env.PUBLIC_URL + `game/money_purse.jpg`,
);

const money4 = new MoneyKart(
  3,
  "Küçük Sandık",
  3,
  "Küçük bir sandık, içi değerli olabilir.",
  2,
  process.env.PUBLIC_URL + `game/small_chest.jpg`,
);

const money5 = new MoneyKart(
  4,
  "Büyük Sandık",
  5,
  "Büyük ve ağır bir sandık.",
  1,
  process.env.PUBLIC_URL + `game/big_chest.jpg`,
);

// Canavarlar

const monster1 = new MonsterKart(
  0,
  "Tofu",
  2,
  1,
  0,
  "Minik tatlı canavar.",
  MonsterBonusTypes.NULL,
  "Merhaba, ben Tofu!",
  3,
  process.env.PUBLIC_URL + `game/tofu.jpeg`,
);

const monster2 = new MonsterKart(
  1,
  "Cadı",
  3,
  2,
  1,
  "Hayatta kaldığı sürece destene zehir kartı koyar.",
  MonsterBonusTypes.ADDER_POISON,
  "Ben Tolp, dikkatli ol!",
  2,
  process.env.PUBLIC_URL + `game/tolp.jpeg`,
);

const monster3 = new MonsterKart(
  2,
  "Sayko",
  7,
  1,
  0,
  "Sayko kalkanları görmezden gelir!",
  MonsterBonusTypes.IGNORE,
  "Sayko burada, kimse bana yaklaşmasın!",
  2,
  process.env.PUBLIC_URL + `game/sayko.jpg`,
);

const monster4 = new MonsterKart(
  3,
  "Koska",
  5,
  4,
  2,
  "Ölmediği her tur gücü +1 artar",
  MonsterBonusTypes.INCREASE_POWER,
  "Koska, güçlü bir rakip!",
  2,
  process.env.PUBLIC_URL + `game/koska.jpg`,
);

const monster5 = new MonsterKart(
  4,
  "Tom",
  3,
  7,
  2,
  "O Tom…",
  MonsterBonusTypes.NULL,
  "Ben Tom, savaşmak benim işim!",
  1,
  process.env.PUBLIC_URL + `game/tom.jpg`,
);

const monster6 = new MonsterKart(
  5,
  "Jerry",
  5,
  3,
  7,
  "Ölmediği her tur can +1 kazanır",
  MonsterBonusTypes.INCREASE_HEALTH,
  "Jerry, sinsi bir rakip!",
  1,
  process.env.PUBLIC_URL + `game/jerry.jpg`,
);

const monster7 = new MonsterKart(
  6,
  "Cerberus",
  6,
  3,
  0,
  "Sıradan bir canavar",
  MonsterBonusTypes.NULL,
  "Cerberus, üç başlı bir yaratık!",
  1,
  process.env.PUBLIC_URL + `game/cerberus.jpg`,
);

const monster8 = new MonsterKart(
  7,
  "Simurg",
  9,
  4,
  0,
  "Ölmediği her tur kalkan +1 kazanır.",
  MonsterBonusTypes.INCREASE_SHIELD,
  "Simurg, efsanevi bir yaratık!",
  1,
  process.env.PUBLIC_URL + `game/simurg.jpg`,
);

const monster9 = new MonsterKart(
  8,
  "Golem",
  2,
  3,
  10,
  "Herhangi bir bonusu yok.",
  MonsterBonusTypes.NULL,
  "Ben Golem, taş gibi güçlüyüm!",
  2,
  process.env.PUBLIC_URL + `game/golem.jpg`,
);

const monster10 = new MonsterKart(
  9,
  "Minator",
  5,
  2,
  3,
  "Hafif silahlar bana etki etmez!",
  MonsterBonusTypes.IGNORE_ARMOR_LIGHT,
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
