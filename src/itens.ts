interface Item {
  description: string;
  size: number;
  point: number;
}

const itens: Item[] = [
  {
    description: 'Saco de dormir',
    size: 15,
    point: 15
  },
  {
    description: 'Corda',
    size: 3,
    point: 7
  },
  {
    description: 'Canivete',
    size: 2,
    point: 10
  },
  {
    description: 'Tocha',
    size: 5,
    point: 5
  },
  {
    description: 'Garrafa',
    size: 9,
    point: 8
  },
  {
    description: 'Comida',
    size: 20,
    point: 17
  }
]

export {
  itens
}

export type {
  Item
}