import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RefrenshtokenService } from './refrenshtoken.service';

@Controller('refrenshtoken')
export class RefrenshtokenController {
  constructor(private readonly refrenshtokenService: RefrenshtokenService) {}
}
