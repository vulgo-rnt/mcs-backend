import { FindOptions } from 'sequelize';

export interface QueryPagination extends FindOptions {
  page: number;
  ord: string;
}
