import {
  EquipmentKart,
  Equipments,
  MoneyKart,
  MonsterKart,
  PotionKart,
} from "./Components/InMemory";

export class GameEngine {
  constructor(defaultEquipment, maxHealth) {
    this.defaultEquipment = defaultEquipment;
    this.maxHealt = maxHealth;
  }

  SetMoney(setGamer, gain) {
    setGamer((old) => ({ ...old, money: old.money + gain }));
  }

  SetHealth(gamer, setGamer, gain) {
    if (gain > 0 && gamer.health === this.maxHealt) return;
    const newHealth = gamer.health + gain;
    if (newHealth <= 0) {
      setGamer((old) => ({ ...old, health: 0 }));
    } else if (newHealth > 0) {
      setGamer((old) => ({ ...old, health: old.health + gain }));
    }

    if (newHealth <= 0) {
      setTimeout(() => {
        alert("Game over! You last the game.");
        window.location.reload();
      }, 800);
    }
  }
  SetShield(gamer, setGamer, gain) {
    if (gain < 0 && -gain > gamer.shield) {
      const extraPoint = gamer.shield + gain;
      setGamer((old) => ({ ...old, shield: 0 }));
      this.SetHealth(gamer, setGamer, extraPoint);
    } else {
      setGamer((old) => ({ ...old, shield: old.shield + gain }));
    }
  }
  AddEquipment(setGamer, equipment) {
    setGamer((old) => ({
      ...old,
      equipments: [...old.equipments, equipment],
    }));
  }
  DeleteEquipment(setGamer, equipment) {
    if (equipment.id === -1) return;
    console.log(equipment.id);
    setGamer((old) => ({
      ...old,
      equipments: old.equipments.filter((eq) => eq.id !== equipment.id),
    }));
  }
  ChangeSelectedEquipment(setSelectedEquipment, id = this.defaultEquipment.id) {
    if (id === -1) {
      setSelectedEquipment(this.defaultEquipment);
    } else {
      const newEquipment = Equipments.find((p) => p.id === id);
      setSelectedEquipment(newEquipment);
    }
  }

  Attack(gamer, setGamer, selectedEquipment, setSelectedEquipment, monster) {
    if (monster instanceof MonsterKart) {
      const monsterLife = monster.shield + monster.health;
      if (selectedEquipment instanceof EquipmentKart) {
        if (selectedEquipment.power < monsterLife) {
          this.SetShield(gamer, setGamer, -monster.attack);
        } else {
          this.DeleteEquipment(setGamer, selectedEquipment);
          this.ChangeSelectedEquipment(setSelectedEquipment);
        }
      }
    }
  }

  IsWin(equipment, monsterLife) {
    return equipment.power >= monsterLife;
  }

  GetBtnProp(card, monsterHandle, MoneyHandle, PotionHandle) {
    const cardPropBtn = {
      handleFunction: null,
      name: "",
    };

    if (card instanceof MonsterKart) {
      cardPropBtn.name = "Attack";
      cardPropBtn.handleFunction = monsterHandle;

      return cardPropBtn;
    } else if (card instanceof MoneyKart) {
      cardPropBtn.name = "Take";
      cardPropBtn.handleFunction = MoneyHandle;

      return cardPropBtn;
    } else if (card instanceof PotionKart) {
      cardPropBtn.name = "Drink";
      cardPropBtn.handleFunction = PotionHandle;

      return cardPropBtn;
    }
    return cardPropBtn;
  }
}
