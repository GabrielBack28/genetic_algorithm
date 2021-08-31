import Individual from "./Individual";

class Population {
  populationIndividuals: Individual[];

  constructor(populationIndividuals: Individual[]) {
    this.populationIndividuals = populationIndividuals;
  }

  /** Generate a random population based on a population size and a max knapsack weight */
  static generateRandomPopulation(populationSize = 0, maxWeight = 0) {
    return new Population(
      new Array(populationSize)
        .fill(0)
        .map(_ => Individual.generateRandomIndividual(maxWeight))
    );
  }

  /** Sort the population individuals by value and return the best indivuals based on a max individuals margin */
  public bestPopulationIndividuals(maxIndividuals: number) {
    return this.populationIndividuals.sort((firstIndividual, secondIndividual) =>
      secondIndividual.knapsack.currentKnapsackValue - firstIndividual.knapsack.currentKnapsackValue
    ).slice(0, maxIndividuals);
  }
}

export default Population;