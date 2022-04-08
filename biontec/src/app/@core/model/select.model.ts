export class SelectModel {
  id: number;
  desc: string;

  constructor(id: number = 0, desc: string = '') {
    this.id = id;
    this.desc = desc;
  }
}
