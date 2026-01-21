import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PermissionsGuard } from 'src/rbac/guards/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from 'src/rbac/decorators/permissions.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Permissions('CREATE_CATEGORY')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Permissions('VIEW_CATEGORIES')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Permissions('VIEW_CATEGORIES_BY_ID')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Permissions('UPDATE_CATEGORY')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Permissions('DELETE_CATEGORY')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
