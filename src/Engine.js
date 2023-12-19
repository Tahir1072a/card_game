import { EquipmentKart, Equipments, MonsterKart } from "./Components/InMemory";

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
    if (gamer.health >= 0) {
      setGamer((old) => ({ ...old, health: old.health + gain }));
    }
    if (gamer.health <= 0) {
      alert("You lose the game!");
      window.location.reload();
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

  Attack(
    gamer,
    setGamer,
    selectedEquipment,
    setSelectedEquipment,
    selectedCard,
  ) {
    if (selectedCard instanceof MonsterKart) {
      const monsterLife = selectedCard.shield + selectedCard.health;
      if (selectedEquipment instanceof EquipmentKart) {
        if (selectedEquipment.power < monsterLife) {
          this.SetShield(gamer, setGamer, -selectedCard.attack);
        } else {
          this.DeleteEquipment(setGamer, selectedEquipment);
          this.ChangeSelectedEquipment(setSelectedEquipment);
        }
      }
    }
  }
}