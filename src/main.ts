import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "./pipes/validation.pipe";

async function start() {
  const PORT = process.env.PORT || 5555;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle("Тестовое для VolgaVolga")
      .setDescription("Документация REST API")
      .setVersion("1.0.0")
      .addTag("GurinRoman")
      .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/documents", app, document);

  app.useGlobalPipes(new ValidationPipe())

  await app.listen( (PORT), () =>
        console.log(
        `Server running at  http://localhost:${process.env.PORT}`,
    ));
    console.log(
        `Documentation can be accessed at  http://localhost:${process.env.PORT}/api/documents `,
    );
}
start();
