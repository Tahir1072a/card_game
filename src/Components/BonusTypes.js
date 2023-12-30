export class MonsterBonusTypes {
  constructor(type) {
    this.type = type;
  }
}

Object.defineProperties(MonsterBonusTypes, {
  INCREASE_HEALTH: { value: 1 },
  INCREASE_SHIELD: { value: 1 },
  INCREASE_POWER: { value: 1 },
  ADDER_POISON: { value: "Zehir" },
  NULL: { value: null },
  ARMOR_LIGHT: { value: "Light" },
  IGNORE: { value: "Shield" },
});
