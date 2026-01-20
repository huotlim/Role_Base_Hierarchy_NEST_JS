import { IsArray, ArrayNotEmpty, IsInt, Min } from 'class-validator';

export class AssignPermissionsDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'permissionIds cannot be empty' })
  @IsInt({ each: true })
  @Min(1, { each: true })
  permissionIds: number[];
}
