
import Population from "./Population";
import Individual from "./Individual";
import Knapsack from "./Knapsack";

import { shuffleArray } from "../utils";

const FIRST_GENERATION = 1;

class Generation {
  population: Population;
  generation: number;
  maxPopulation: number;
  maxKnapsackWeight: number;
  generationSelection: number;
  mutationProbability: number;

  constructor(
    population: Population,
    generation: number,
    maxPopulation: number,
    generationSelection: number,
    maxKnapsackWeight: number,
    mutationProbability: number
  ) {
    this.generation = generation;
    this.population = population;
    this.maxPopulation = maxPopulation;
    this.maxKnapsackWeight = maxKnapsackWeight;
    this.generationSelection = generationSelection;
    this.mutationProbability = mutationProbability;
  }

  /** Create a new generation based on the max population, a max selection of the best individuals, a max weight for the knapsack and a mutation probability */
  static createGeneration(maxPopulation = 10, selectionPerGeneration = 5, maxKnapsackWeight = 30, mutationProbability = 0.2) {
    return new Generation(
      Population.generateRandomPopulation(maxPopulation, maxKnapsackWeight),
      FIRST_GENERATION,
      maxPopulation,
      selectionPerGeneration,
      maxKnapsackWeight,
      mutationProbability
    );
  }

  /** Return a new generation based on the crossovers of the current generation population */
  createNewGeneration() {
    let bestIndividuals: Individual[] = this.population.bestPopulationIndividuals(this.generationSelection);

    shuffleArray(bestIndividuals);

    let newPopulation: Individual[] = [];

    var firstIndividual: Individual | undefined;
    var secondIndividual: Individual | undefined;

    while (bestIndividuals.length >= 2) {
      firstIndividual = bestIndividuals.pop();
      secondIndividual = bestIndividuals.shift();

      new Array(Math.floor(this.generationSelection / 2)).fill(0).forEach(_ => {
        if (firstIndividual && secondIndividual) {
          let thirdIndividual: Individual = Individual.individualsCrossover(firstIndividual, secondIndividual);

          newPopulation.push(thirdIndividual);

          if (Math.random() <= this.mutationProbability) {
            let fourthIndividual = new Individual(
              Knapsack.mutateKnapsack(thirdIndividual.knapsack, this.mutationProbability)
            );

            newPopulation.push(fourthIndividual);
          }
        }
      });
    }

    return new Generation(
      new Population(newPopulation),
      this.generation + 1,
      this.maxPopulation,
      this.generationSelection,
      this.maxKnapsackWeight,
      this.mutationProbability);
  }

  /** Return the best individuals of the current generation */
  bestGenerationIndividuals() {
    return this.population.bestPopulationIndividuals(this.generationSelection);
  }
}

export default Generation;