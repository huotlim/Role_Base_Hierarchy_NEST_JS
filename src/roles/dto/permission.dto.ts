import { IsOptional, IsString } from "class-validator";

export class PermissionDto {

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    
}