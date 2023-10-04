import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Constantes } from './modules/utils/Contants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(Constantes.TITULO_DOCUMENTACION)
    .setDescription(Constantes.DESCRIPCION_DOCUMENTACION)
    .setVersion(Constantes.VERSION_DOCUMENTACION)
    .addTag(Constantes.TAGS_DOCUMENTACION)
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
