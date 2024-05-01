import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Mc } from 'src/mcs/entities/mc.entity';

const config: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'lelouch',
  password: '123456',
  database: 'mydatabase',
  autoLoadModels: true,
  synchronize: true,
  models: [Mc],
};

export default config;
