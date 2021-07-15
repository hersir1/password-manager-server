import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppService } from './app.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: "*",
			methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
			allowedHeaders: "Content-Type, Accept",
			credentials: false
		}
	});
	
	const options = new DocumentBuilder()
		.setTitle("Vinaigrette Server Swagger")
		.setDescription("Vinaigrette Server Swagger")
		.setVersion("1.0")
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup("api", app, document);

	app.get(AppService).subscribeToShutdown(() => app.close());
	await app.listen(3000);
}

bootstrap();
