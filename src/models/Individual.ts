import Knapsack from "./Knapsack";

class Individual {
  knapsack: Knapsack;

  constructor(knapsack: Knapsack) {
    this.knapsack = knapsack;
  }

  /** Create a knapsack crossover between two individuals, with that crossover a new individual is created */
  static individualsCrossover(firstIndividual: Individual, secondIndividual: Individual) {
    let newIndividualKnapsack = Knapsack.crossoverKnapsacks(firstIndividual.knapsack, secondIndividual.knapsack);
    let newIndividual = new Individual(newIndividualKnapsack);

    newIndividualKnapsack = Knapsack.crossoverKnapsacks(firstIndividual.knapsack, secondIndividual.knapsack);

    return newIndividual;
  }

  /** Generate a new random individual following a base knapsack max weights */
  static generateRandomIndividual(maxKnapsackWeight: number) {
    let newBackpack = Knapsack.generateRandomKnapsack(maxKnapsackWeight);

    return new Individual(newBackpack);
  }
}

export default Individual;