import { Module } from '@nestjs/common';
import { InitController } from './init.controller';
import { InitService } from './init.service';
import { Config } from '../../../shared/Config';

import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  controllers: [InitController],
  providers: [InitService],
  imports: [ElasticsearchModule.register({
    node: Config.elasticUrl,
  })],
})
export class InitModule {}
