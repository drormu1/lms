import { Test } from '@nestjs/testing';
import { Controller, Get } from '@nestjs/common';
import { Subject } from 'rxjs';
import { Metadata } from '../../../shared/Metadata';
import { InitService } from './init.service';
const axios = require('axios');


@Controller('api/init')
export class InitController {
    constructor(private readonly initService: InitService) {}
    
    @Get()
    async init(): Promise<Metadata> {
       
      return this.initService.init();
    }

    @Get()
    test(): string {
        return 'test from init!';
    }
}


