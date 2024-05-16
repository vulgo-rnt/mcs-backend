import { SequelizeModuleOptions } from '@nestjs/sequelize';

const config: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'lelouch',
  password: '123456',
  database: 'mydatabase',
  autoLoadModels: true,
  synchronize: true,
  logging: false,
};

export default config;
