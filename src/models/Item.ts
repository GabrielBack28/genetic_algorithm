class Item {
  name: string;
  value: number;
  weight: number;

  /** List of available items to be choosen */
  static availableItems: Item[] = []

  constructor(name: string, weight: number, value: number) {
    this.name = name;
    this.value = value;
    this.weight = weight;
  }
}

export default Item;