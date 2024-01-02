import {
  EquipmentKart,
  Equipments,
  MoneyKart,
  MonsterKart,
  PotionKart,
} from "./Components/InMemory";
import { MonsterBonusTypes } from "./Components/BonusTypes";

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
    if (!(monster instanceof MonsterKart)) return;
    if (!(selectedEquipment instanceof EquipmentKart)) return;

    const monster_life = this.CalculateMonsterLife(selectedEquipment, monster);
    const equipment_power = this.CalculateEquipmentPower(
      selectedEquipment,
      monster,
    );

    if (equipment_power < monster_life) {
      if (monster.bonus === MonsterBonusTypes.IGNORE) {
        this.SetHealth(gamer, setGamer, -monster.attack);
      } else {
        this.SetShield(gamer, setGamer, -monster.attack);
      }
    } else {
      this.DeleteEquipment(setGamer, selectedEquipment);
      this.ChangeSelectedEquipment(setSelectedEquipment);
    }
  }
  CalculateEquipmentPower(equipment, monster) {
    if (!(monster instanceof MonsterKart)) return;
    if (!(equipment instanceof EquipmentKart)) return;

    if (monster.bonus === MonsterBonusTypes.IGNORE_ARMOR_LIGHT) {
      if (equipment.type === MonsterBonusTypes.IGNORE_ARMOR_LIGHT) {
        return 0;
      }
      return equipment.power;
    }

    return equipment.power;
  }
  CalculateMonsterLife(selected_equipment, monster) {
    let monster_life = 0;

    if (!(monster instanceof MonsterKart)) return;

    if (selected_equipment.bonus !== 0) {
      if (selected_equipment.bonus !== -1) {
        let remaining_shield = monster.shield - selected_equipment.bonus;
        if (remaining_shield > 0) {
          monster_life = remaining_shield + monster.health;
        } else if (remaining_shield <= 0) {
          monster_life = monster.health;
        }
      } else if (selected_equipment.bonus === -1) {
        monster_life = monster.health;
      }
    } else {
      monster_life = monster.health + monster.shield;
    }

    return monster_life;
  }
  IsWin(equipment, monster) {
    const monster_life = this.CalculateMonsterLife(equipment, monster);
    const equipmentPower = this.CalculateEquipmentPower(equipment, monster);
    return equipmentPower >= monster_life;
  }

  GetCardType(card) {
    if (card instanceof MonsterKart) {
      return "Monster";
    } else if (card instanceof MoneyKart) {
      return "Money";
    } else if (card instanceof PotionKart) {
      return "Potion";
    }

    return "Equipment";
  }
  SelectNewCard(setSelectedCard, deck, setDeck, dispatch) {
    if (this.IsDeckEmpty(deck)) {
      alert("Oyun Bitti Kazandınız!");
      window.location.reload();
      return;
    }
    const { typeIndex, cardIndex } = this.Randomize(deck);
    setSelectedCard(deck[typeIndex][cardIndex]);
    if (deck[typeIndex][cardIndex].copyCount <= 1) {
      setDeck(
        deck
          .map((p) => p.filter((s) => s !== deck[typeIndex][cardIndex]))
          .filter((k) => k.length > 0),
      );
    } else {
      deck[typeIndex][cardIndex].copyCount += -1;
    }

    dispatch({
      type: "open_new_card",
      payload: this.GetCardType(deck[typeIndex][cardIndex]),
    });
  }
  Randomize(deck) {
    const typeIndex = Math.floor(Math.random() * deck.length);
    const cardIndex = Math.floor(Math.random() * deck[typeIndex].length);

    return { typeIndex, cardIndex };
  }
  CardBonusCycle(selectedCard, setSelectedCard, deck, setDeck, zehir) {
    if (this.IsDeckEmpty(deck)) return;
    if (!(selectedCard instanceof MonsterKart)) return;
    if (selectedCard.bonus === MonsterBonusTypes.NULL) return;
    const copy_monster = this.DeepCopyMonster(selectedCard);
    if (selectedCard.bonus === MonsterBonusTypes.INCREASE_SHIELD) {
      copy_monster.shield = copy_monster.shield + 1;
    } else if (selectedCard.bonus === MonsterBonusTypes.INCREASE_POWER) {
      copy_monster.attack = copy_monster.attack + 1;
    } else if (selectedCard.bonus === MonsterBonusTypes.INCREASE_HEALTH) {
      copy_monster.health = copy_monster.health + 1;
    } else if (selectedCard.bonus === MonsterBonusTypes.ADDER_POISON) {
      const isZehirExist = deck.map((cards) =>
        cards.some((card) => card.name === "Zehir"),
      );
      if (isZehirExist.includes(true)) {
        setDeck(deck.map((cards) => this.ChangePotionCard(cards)));
      } else {
        const isFirstElementPotionKart = deck[0][0] instanceof PotionKart;

        if (isFirstElementPotionKart) {
          deck[0].push(zehir);
        } else {
          deck.push([zehir]);
        }
      }
    }
    setSelectedCard(copy_monster);
  }

  ChangePotionCard(cards) {
    if (!(cards[0] instanceof PotionKart)) return cards;

    cards = cards.map((card) => {
      if (card.name !== "Zehir") return card;
      if (card.copyCount > 3) return card;
      card.copyCount = card.copyCount + 1;
      return card;
    });

    return cards;
  }

  DeepCopyMonster(monster_object) {
    const copy_obj = Object.assign({}, monster_object);
    return new MonsterKart(
      copy_obj.id,
      copy_obj.name,
      copy_obj.attack,
      copy_obj.health,
      copy_obj.shield,
      copy_obj.bonus_text,
      copy_obj.bonus,
      copy_obj.talk,
      copy_obj.copyCount,
      copy_obj.pngUrl,
    );
  }

  IsDeckEmpty(deck) {
    return deck.length < 1;
  }
}
