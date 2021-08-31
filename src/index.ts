import Item from "./models/Item";
import Generation from "./models/Generation";

const MAX_POPULATION = 100;
const MAX_KNAPSACK_WEIGHT = 30;
const GENERATIONS_QUANTITY = 10;
const MUTATION_PROBABILITY = 0.4;
const SELECTION_PER_GENERATION = 10;

Item.availableItems = [
  new Item("Sleeping Bag", 15, 15),
  new Item("Rope", 3, 7),
  new Item("Switchblade", 2, 10),
  new Item("Torch", 5, 5),
  new Item("Bottle", 9, 8),
  new Item("Food", 20, 17)
];

/** Initialize the generations iterations, getting the best individuals of each generation
 * and printing the selected items, total value and total weight for each one. */
function startGenerations() {
  let generation = null;

  for (var iteration = 0; iteration <= GENERATIONS_QUANTITY; iteration++) {
    generation = generation
      ? generation.createNewGeneration()
      : Generation.createGeneration(
        MAX_POPULATION,
        SELECTION_PER_GENERATION,
        MAX_KNAPSACK_WEIGHT,
        MUTATION_PROBABILITY
      );

    let generationBestIndividuals = generation.bestGenerationIndividuals();

    const bestIndividualsItems = generationBestIndividuals.map(({ knapsack }) => ({
      items: knapsack.knapsackItems.map(knapsackItem => knapsackItem.name).join(', '),
      weight: knapsack.currentKnapsackWeight,
      value: knapsack.currentKnapsackValue,
    }));

    console.log(`Generation - ${generation.generation}`);
    console.table(bestIndividualsItems);
  }
}

startGenerations();