import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeormConfig: TypeOrmModuleOptions = {​​​​
    ​type: 'postgres',
    host: 'localhost',
    // port: 5433, // port pcfixe
    port: 5432, //port pcportable
    username: 'postgres',
    password: 'root',
    database: 'albumcollection',
    autoLoadEntities: true,
    synchronize: true,​
};