import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Mc } from './entities/mc.entity';
import { Video } from 'src/videos/entities/video.entity';

@Injectable()
export class McsService {
  constructor(
    @InjectModel(Mc)
    private readonly mcModel: typeof Mc,
  ) {}

  async create(mcDate): Promise<Mc> {
    const mc = new Mc(mcDate);
    return await mc.save();
  }

  async findAll(): Promise<Mc[]> {
    return this.mcModel.findAll();
  }

  async findOne(_mcId: string): Promise<Mc> {
    return this.mcModel.findOne({
      where: { _mcId },
      include: [{ model: Video }],
    });
  }

  async update(id: number, mcData): Promise<[number, Mc[]]> {
    const [affectedCount, affectedRows] = await this.mcModel.update(mcData, {
      where: { id },
      returning: true,
    });
    return [affectedCount, affectedRows as Mc[]];
  }

  async remove(_mcId: string): Promise<number> {
    return this.mcModel.destroy({ where: { _mcId } });
  }
}
