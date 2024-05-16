import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Battle } from './entities/battle.entity';
import { QueryPagination } from 'src/@types/query-pagination';

@Injectable()
export class BattlesService {
  constructor(
    @InjectModel(Battle)
    private readonly battleModel: typeof Battle,
  ) {}

  async create(battleData): Promise<Battle> {
    const battle = new Battle(battleData);
    return await battle.save();
  }

  async findAll(query?: QueryPagination): Promise<Battle[]> {
    if (!query.page || !query.limit) {
      return this.battleModel.findAll();
    } else {
      const limit = query.limit;
      const offset = (query.page - 1) * limit;
      return this.battleModel.findAll({ limit, offset });
    }
  }

  async findAllId(): Promise<Pick<Battle, '_battleId' | 'name'>[]> {
    return this.battleModel.findAll({ attributes: ['_battleId', 'name'] });
  }

  async findOne(_battleId: string): Promise<Battle> {
    return this.battleModel.findOne({
      where: { _battleId },
    });
  }

  async delete(_battleId: string): Promise<number> {
    return this.battleModel.destroy({ where: { _battleId } });
  }
}
