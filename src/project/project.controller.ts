import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { Public } from 'src/auth/public-strategy';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
@ApiTags('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Public()
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.createProject(createProjectDto);
  }

  @Get(':id')
  async getProjectById(@Param('id') id: number) {
    return await this.projectService.getProjectById(id);
  }

  @Get()
  async getAllProjects() {
    return await this.projectService.getAllProjects();
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  async deleteProject(
    @Param('id', new ParseUUIDPipe()) id: number,
  ): Promise<{ message: string }> {
    return await this.projectService.deleteProject(id);
  }
}
