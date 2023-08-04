import { PartialType } from '@nestjs/mapped-types';
import { CreateRefrenshtokenDto } from './create-refrenshtoken.dto';

export class UpdateRefrenshtokenDto extends PartialType(CreateRefrenshtokenDto) {}
