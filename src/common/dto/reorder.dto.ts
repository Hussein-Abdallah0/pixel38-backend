import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsString, Min, ValidateNested } from 'class-validator';
import { swaggerExamples } from '../swagger/api-examples';

export class ReorderItemDto {
  @ApiProperty({ example: 'clxyz123abc' })
  @IsString()
  id: string;

  @ApiProperty({ example: 0, minimum: 0 })
  @IsInt()
  @Min(0)
  sortOrder: number;
}

export class ReorderDto {
  @ApiProperty({
    type: [ReorderItemDto],
    example: swaggerExamples.service.reorderRequest.items,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ReorderItemDto)
  items: ReorderItemDto[];
}
