import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { Config } from '../../../shared/Config';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [ElasticsearchModule.register({
    node: process.env.ELASTIC_URL,
  })],
  
})
export class SearchModule {}
 