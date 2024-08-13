import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Res,
  HttpException,
  UseInterceptors,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Response } from 'express';
import { LoggingInterceptor } from './interceptors/logging-interceptor';
import { ResponseMsg } from './decorators/response-message-decorators';
import { ResponseTransformInterceptor } from './interceptors/response-transform-interceptor';

// @UseInterceptors(LoggingInterceptor)
@Controller('todos')
@UseInterceptors(ResponseTransformInterceptor)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // @Post()
  // @HttpCode(HttpStatus.OK)
  // create(@Body() createTodoDto: CreateTodoDto) {
  //   return this.todosService.create(createTodoDto);
  // }

  // @Post()
  // async create(@Body() createTodoDto: CreateTodoDto, @Res() res: Response) {
  //   const createdTodo = await this.todosService.create(createTodoDto);
  //   res.status(HttpStatus.CREATED).json({
  //     message: '성공적으로 할일이 추가되었습니다.',
  //     statusCode: 200,
  //     data: createTodoDto,
  //   });
  // } //express 방식으로 진행하는 방법

  @Post()
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('성공적으로 할일이 추가되었습니다.')
  async create(@Body() createTodoDto: CreateTodoDto) {
    const createdTodo = await this.todosService.create(createTodoDto);
    return createTodoDto;
  } //express 방식으로 진행하는 방법 근데 res를 안쓴다면

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('성공적으로 할일을 모두 가져왔습니다.')
  async findAll() {
    const fetchedTodos = await this.todosService.findAll();
    return fetchedTodos;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('성공적으로 해당 할일을 가져왔습니다.')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const foundTodo = await this.todosService.findOne(+id);
    if (foundTodo === null) {
      throw new HttpException(
        '해당 할일이 존재하지 않았습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    return foundTodo;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('성공적으로 해당 할일을 수정 되었습니다.')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const foundTodo = await this.todosService.findOne(+id);
    if (foundTodo === null) {
      throw new HttpException(
        '해당 할일이 존재하지 않았습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    const updateTodo = await this.todosService.update(+id, updateTodoDto);
    return updateTodo;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ResponseMsg('성공적으로 해당 할일을 삭제 되었습니다.')
  async remove(@Param('id') id: number) {
    const foundTodo = await this.todosService.findOne(+id);
    if (foundTodo === null) {
      throw new HttpException(
        '해당 할일이 존재하지 않았습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    const deleteTodo = await this.todosService.remove(+id);
    return deleteTodo;
  }
}
