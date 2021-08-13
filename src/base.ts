import { Item } from './itens';

export class Base {
  public selectedItens: Item[] = [];
  public readonly backpackSize: number = 0;

  constructor(backpackSize: number) {
    this.backpackSize = backpackSize;
  }

  private getSum(itemKey: keyof Omit<Item, 'description'>) {
    return this.selectedItens.map(item => item[itemKey]).reduce((prev, next) => prev + next);
  }

  protected showResult() {
    console.table(this.selectedItens);
    console.log('Max size: ', this.getSum('size'));
    console.log('Max point: ', this.getSum('point'));
  }
}