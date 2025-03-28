import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => Todo)
  async createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    console.log('Received input:', createTodoInput); // Debugging input

    const newTodo = await this.todoService.create(createTodoInput);

    console.log('Returned from service:', newTodo); // Debugging output
    return newTodo;
  }

  @Query(() => [Todo], { name: 'todos' }) // Changed name to plural for clarity
  async findAll() {
    console.log('Fetching all todos...');
    return await this.todoService.findAll();
  }

  @Query(() => Todo, { name: 'todo' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    console.log(`Fetching todo with id: ${id}`);
    return await this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  async updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    console.log('Updating todo:', updateTodoInput);
    return await this.todoService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => Todo)
  async removeTodo(@Args('id', { type: () => Int }) id: number) {
    console.log(`Removing todo with id: ${id}`);
    return await this.todoService.remove(id);
  }
}
