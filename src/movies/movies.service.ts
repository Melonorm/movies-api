import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { Movie } from "./entities/movie.entity";

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData  // "распаковываем" поля movieData внутрь объекта, который будет помещаться в массив movies
    });
  }

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    // Ищет в movies фильм с переданным id. Т.к. id в аргументе строка, он сначала парсится в int
    /*return this.movies.find(movie => movie.id === parseInt(id));*/
    const movie: Movie = this.movies.find(movie => movie.id === +id);  // Эта запись ИДЕНТИЧНА предыдущей (парсинг строки в число можно записать через + str)
    if (!movie) {
      throw new NotFoundException(`Фильм с id: ${id} не найден!`);
    }
    return movie;
  }

  remove(id: string): Boolean {
    this.getOne(id); // если фильм по id не найден, выбросится ошибка из getOne() метода
    this.movies = this.movies.filter(movie => movie.id !== parseInt(id));
    return true;
  }

  patch(id: string, updateData) {
    const movie = this.getOne(id); // сначала находим фильм по id
    this.remove(id);    // потом удаляем его из БД
    // Используя оператор "..." - Старые поля объединятся, если есть новые, - они допишутся в объект, который будет добавлен в массив (БД)
    this.movies.push({...movie, ...updateData})  // пересоздаём объект в БД
  }
}
