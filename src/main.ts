import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT: number = Number.parseInt(process.env.PORT) || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`Server started at ${PORT} port`));
}
bootstrap();

/*
      1. nest g controller movies
         - NB!!! В Nest важно расположение методов в контроллерах!!!
                 В MovieController метод search() должен находиться ПЕРЕД методом getOne()
         - NB!!! @Query - Ключ query параметра прописываются в конце адресной строке после знака "?".
                        - Значение query параметра устанавливается после ключа и знака "=". НЕ РАЗДЕЛЯЕТСЯ ПРОБЕЛАМИ!
                        - Следующие query параметры разделяются знаком "&".
                 Пример: "/movies/search?year=2000&rating=5"


       2. nest g service movies
         - NB!!! Парсинг строки в число вместо "parseInt(str)" можно записать +str
         - NB!!! Поля какого-либо объекта можно "распаковать" внутри другого объекта через оператор "..."
                 Пример: secondObject = {
                              secondObjectField,
                              ...firstObject
                           }
         - NB!!! С помощью нескольких операторов "..." можно "распаковать" в новый объект несколько объектов.
                 Новые поля при этом добавятся, старые перезапишутся.
                 Пример: newObject = {
                           ...firstObject,
                           ...secondObject
                         }


 */
