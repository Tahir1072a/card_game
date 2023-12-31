export class MonsterBonusTypes {
  constructor(type) {
    this.type = type;
  }
}

Object.defineProperties(MonsterBonusTypes, {
  INCREASE_HEALTH: { value: "Health" },
  INCREASE_SHIELD: { value: "Shield" },
  INCREASE_POWER: { value: "Power" },
  ADDER_POISON: { value: "Zehir" },
  NULL: { value: null },
  IGNORE_ARMOR_LIGHT: { value: "Light" },
  IGNORE: { value: "Shield_Ignore" },
});

export class EquipmentTypes {
  constructor(type) {
    this.type = type;
  }
}

Object.defineProperties(EquipmentTypes, {
  LIGHT: { value: "Light" },
  MEDIUM: { value: "Medium" },
  HEAVY: { value: "Heavy" },
});
