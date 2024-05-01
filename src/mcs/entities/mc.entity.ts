import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Mc extends Model<Mc> {
  constructor(name?: string) {
    super(name);
  }
  @Column
  name: string;
}
