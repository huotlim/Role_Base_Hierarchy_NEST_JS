import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class RoleDto{
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()  
  @Min(1)
  parentId?: number;

  @IsOptional()
  @IsString()
  description?: string;
}