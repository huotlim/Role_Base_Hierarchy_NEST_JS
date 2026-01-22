import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class RoleDto{
  @ApiProperty({example: 'Test Role'})
  @IsString()
  name: string;

  @ApiProperty({example: 10, required: false})
  @IsOptional()
  @IsInt()  
  @Min(1)
  parentId?: number;

  @ApiProperty({example: 'This is a test role', required: false})
  @IsOptional()
  @IsString()
  description?: string;
}