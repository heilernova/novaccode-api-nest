import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    CoreModule
  ],
  controllers: [
    PersonsController
  ],
  providers: [PersonsService]
})
export class PersonsModule {}
