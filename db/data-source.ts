import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: '54.169.85.211',
  port: 33066,
  username: 'phet',
  password: 'qUXrNgyga9gnYKpk',
  database: 'db_phet',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  debug: false,
  //synchronize: true
};
const dataSource = new DataSource(dataSourceOptions);

export default dataSource