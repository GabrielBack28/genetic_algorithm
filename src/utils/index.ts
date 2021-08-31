const TOTAL_SHUFFLES = 4;

export function shuffleArray(array: unknown[]) {
  for (var shuffle = 1; shuffle <= TOTAL_SHUFFLES; shuffle++) {
    for (let iteration = array.length - 1; iteration > 0; iteration--) {
      const j = Math.floor(Math.random() * (iteration + 1));

      [array[iteration], array[j]] = [array[j], array[iteration]];
    }
  }
}