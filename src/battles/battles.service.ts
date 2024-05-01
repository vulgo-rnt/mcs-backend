import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Battle } from './entities/battle.entity';
import { Video } from 'src/videos/entities/video.entity';

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

  async findAll(): Promise<Battle[]> {
    return this.battleModel.findAll();
  }

  async findOne(_battleId: string): Promise<Battle> {
    return this.battleModel.findOne({
      include: [{ model: Video }],
      where: { _battleId },
    });
  }
  async delete(_battleId: string): Promise<number> {
    return this.battleModel.destroy({ where: { _battleId } });
  }
}
