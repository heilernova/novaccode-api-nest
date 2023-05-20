import { Module } from '@nestjs/common';
import { ConnectionsService, DBDataService } from './db';
import { ConfigService } from './config';

@Module({
    providers: [
        ConfigService,
        ConnectionsService,
        DBDataService
    ],
    exports: [
        ConfigService,
        ConnectionsService,
        DBDataService
    ]
})
export class CoreModule {}
