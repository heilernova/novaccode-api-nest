import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LocationsModule } from './modules/locations/locations.module';
import { PersonsModule } from './modules/persons/persons.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AdminModule } from './modules/admin/admin.module';
import { CoreModule } from './core/core.module';
import { HttpInterceptor } from './http';

@Module({
  imports: [
    LocationsModule,
    PersonsModule,
    AccountsModule,
    AdminModule,
    RouterModule.register([
      {
        path: 'data',
        children: [
          { path: 'persons', module: PersonsModule },
          { path: '', module: LocationsModule }
        ]
      }
    ]),
    CoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: HttpInterceptor, scope: Scope.REQUEST }
  ],
})
export class AppModule {}
