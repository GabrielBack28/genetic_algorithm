import { Base } from './base';
import { itens } from './itens';

export class Dinamic extends Base {
  public table: number[][] = [];
  public value: number[][] = [];
  public avaliableSpace: number[] = [];

  constructor(backpackSize: number) {
    super(backpackSize);
  }

  private createTable(item: number, size: number) {
    if (item < 0 || size < 0) return 0;
    return this.table[item][size];
  }

  private defineAvaliableSpace() {
    for (var i = 0; i <= this.backpackSize; i++) {
      this.avaliableSpace.push(i);
    }
  }

  private startTableAndValues() {
    for (let i = 0; i < itens.length; i++) {
      this.table[i] = [];
      this.value[i] = [];
      
      for (var j = 0; j < this.avaliableSpace.length; j++) {
        this.table[i][j] = 0;
        this.value[i][j] = 0;
      }
    }
  }

  private calculateTable() {
    for (var i = 0; i < itens.length; i++) {
      const item = itens[i];
      for (var j = 0; j < this.avaliableSpace.length; j++) {
        // se o j < item.peso, nao pegar
        if (j < item.size) {
          this.table[i][j] = this.createTable(i - 1, j);
        } else {
          // pegar para a tabela ou retirar, pegar sempre o de maior valor
          const takeByValue = item.point + this.createTable(i - 1, j - item.size);
          const removeByValue = this.createTable(i - 1, j);
          this.table[i][j] =
            takeByValue > removeByValue ? takeByValue : removeByValue;
            this.value[i][j] = takeByValue > removeByValue ? 1 : 0;
        }
      }
    }
  }

  private groupSelectedItens() {
    var peso_avail = this.backpackSize;
    var item_index = itens.length - 1;
    for (item_index; item_index >= 0; item_index--) {
      if (this.value[item_index][peso_avail] === 1) {
        this.selectedItens.push(itens[item_index]);
        peso_avail -= itens[item_index].size;
      }
    }
  }

  public start() {
    this.defineAvaliableSpace();
    this.startTableAndValues();
    this.calculateTable();
    this.groupSelectedItens();

    this.showResult();
  }
}
