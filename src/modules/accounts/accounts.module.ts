import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    CoreModule
  ],
  controllers: [AccountsController],
  providers: [AccountsService]
})
export class AccountsModule {}
