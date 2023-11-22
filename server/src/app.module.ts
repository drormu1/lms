import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InitModule } from './init/init.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [InitModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
