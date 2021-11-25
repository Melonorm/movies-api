import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { Movie } from "./entities/movie.entity";

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {
  }

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // Метод должен находиться НАД (ПЕРЕД) методом getOne(),
  // иначе Nest будет считать, что вызывается getOne() с параметром id = "search"
  @Get('/search') // @Query параметры прописываются а адресной строке после "?"
  search(@Query('year') year: string, // Разделяются между собою знаком "&"
         @Query('rating') rating: number) { // ("/movie/search?year=2000&rating=5")
    return `Поиск фильма, выпущенного после ${year} года с рейтингом ${rating}.`;
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Movie {
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() movieData) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
     return this.moviesService.remove(id);
  }

  @Patch('/:id')
  patch(@Param('id') id: string, @Body() updateData) {
    return this.moviesService.patch(id, updateData);
  }
}
