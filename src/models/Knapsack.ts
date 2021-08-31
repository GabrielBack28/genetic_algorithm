import Item from './Item';

import { shuffleArray } from '../utils';

class Knapsack {
  knapsackItems: Item[]
  maxKnapsackWeight: number;

  constructor(maxKnapsackWeight = 0) {
    this.knapsackItems = [];
    this.maxKnapsackWeight = maxKnapsackWeight;
  }

  /** Get the current knapsack total weight */
  get currentKnapsackWeight() {
    return this.knapsackItems.reduce((previous, current) => previous + current.weight, 0);
  }

  /** Get the current knapsack total value */
  get currentKnapsackValue() {
    return this.knapsackItems.reduce((previous, current) => previous + current.value, 0);
  }

  /** Check if the knapsack still have space */
  hasAvailableSpace(forWeight = 0) {
    return (this.currentKnapsackWeight + forWeight) <= this.maxKnapsackWeight;
  }

  /** Check if the item exists in the knapsack */
  haveItemInKnapsack(item: Item) {
    return Boolean(this.knapsackItems.find(knapsackItem => knapsackItem == item));
  }

  /** Generate a new random knapsack based on a max knapsack weight and the available items */
  static generateRandomKnapsack(maxWeight = 0, availableItems: Item[] = Item.availableItems) {
    if (!!availableItems) {
      let clonedAvailableItems = [...availableItems];

      if (maxWeight > 0 && clonedAvailableItems.length > 0) {
        var newBackpack = new Knapsack(maxWeight);

        shuffleArray(clonedAvailableItems);

        while (newBackpack.hasAvailableSpace() && clonedAvailableItems.length > 0) {
          let currentItem = clonedAvailableItems.pop();

          if (currentItem && newBackpack.hasAvailableSpace(currentItem?.weight)) {
            newBackpack.knapsackItems.push(currentItem);
          }
        }

        return newBackpack;
      }
    }

    return new Knapsack(maxWeight);
  }

  /** Based on the crossover of two knapsacks items, a new one is created */
  static crossoverKnapsacks(firstKnapsack: Knapsack, secondKnapsack: Knapsack) {
    let commonItems = firstKnapsack.knapsackItems.filter(firstKnapsackItem =>
      secondKnapsack.knapsackItems.find(secondKnapsackItem => firstKnapsackItem == secondKnapsackItem)
    );

    let uncommonItems = [
      ...(firstKnapsack.knapsackItems.filter(firstKnapsackItem => !commonItems.find(item => firstKnapsackItem == item))),
      ...(secondKnapsack.knapsackItems.filter(secondKnapsackItem => !commonItems.find(item => secondKnapsackItem == item)))
    ];

    let availableBackpackItems = [
      ...commonItems,
      ...uncommonItems.filter(_ => (Math.round(Math.random()) == 1))
    ];

    let crossedOverBackpack = Knapsack.generateRandomKnapsack(firstKnapsack.maxKnapsackWeight, availableBackpackItems);

    return crossedOverBackpack;
  }

  /** Based on a existent knapsack and a mutation probability, a new random knapsack is created with some new items */
  static mutateKnapsack(knapsack: Knapsack, mutationProbability: number) {
    let mutatedItems: Item[] = [];

    while (mutatedItems.length < knapsack.knapsackItems.length) {
      var item: Item | undefined;

      if (Math.random() > mutationProbability) {
        item = knapsack.knapsackItems.pop()
      } else {
        item = Item.availableItems.find(item => !knapsack.knapsackItems.find(current => current == item));
      }

      if (item) {
        mutatedItems.push(item);
      }
    }

    let mutatedKnapsack = Knapsack.generateRandomKnapsack(knapsack.maxKnapsackWeight, mutatedItems);

    return mutatedKnapsack;
  }
}

export default Knapsack;