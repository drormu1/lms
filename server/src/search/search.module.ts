import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [ElasticsearchModule.register({
    node: 'http://localhost:9200',
  })],
  
})
export class SearchModule {}
