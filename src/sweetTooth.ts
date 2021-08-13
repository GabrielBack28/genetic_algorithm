import { itens, Item } from './itens';
import { Base } from './base';

export class SweetTooth extends Base {
  public backpackCount = 0;
  public max: Item; 
  public backpackValue = 0;

  constructor(backpackSize: number) {
    super(backpackSize);
    this.max = {
      description: '',
      point: 0,
      size: 0
    };
  }

  private removeByAttr(arr: Item[], attr: keyof Item, value: string) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        (arguments.length > 2 && arr[i][attr] === value)
      ) {
        arr.splice(i, 1);
      }
    }
  }

  start() {
    do {
      this.max = itens.reduce(function(before, current) {
        return before.point > current.point ? before : current;
      });
      if (this.max.size + this.backpackCount <= this.backpackSize) {
        this.selectedItens.push(this.max);
        this.backpackCount += this.max.size;
        this.backpackValue += this.max.point;
        this.removeByAttr(itens, "description", this.max.description);
      } else {
        this.removeByAttr(itens, "description", this.max.description);
      }
    } while (this.backpackSize > this.backpackCount && itens.length > 0);

    this.showResult();
  }
}