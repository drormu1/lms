import { Body, Controller } from '@nestjs/common';
import { SearchService } from './search.service';
import {  Get,Post } from '@nestjs/common';
import { ISearchRequest } from '../../../shared/ISearchRequest';
import { ISearchResponse } from '../../../shared/ISearchResponse';
@Controller('api/search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}
    
    // @Get()
    // async searchGet(): Promise<string[]> {       
    //   return this.searchService.serch(undefined);
    // }

    @Post()
    async search(@Body() searchRequest: ISearchRequest): Promise<ISearchResponse> {       
      return this.searchService.search(searchRequest);
    }
  
}