import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query
} from "@nestjs/common";
import { AppService } from "./app.service";
import { Resource } from "./model/resource";

@Controller()
export class AppController {
	
	constructor(private readonly appService: AppService) {
	}
	
	@Get()
	@HttpCode(HttpStatus.OK)
	getResources(
		@Query("pageIndex", ParseIntPipe) pageIndex: number,
		@Query("pageSize", ParseIntPipe) pageSize: number,
		@Query("name") name?: string,
		@Query("sortColumn") sortColumn?: string,
		@Query("sortValue") sortValue?: "asc" | "desc" | null
	): Promise<Resource[]> {
		return this.appService.getResources(pageIndex, pageSize, sortColumn, sortValue, name);
	}
	
	@Get("/size")
	@HttpCode(HttpStatus.OK)
	getResourcesSize(
		@Query("name") name?: string
	): Promise<number> {
		return this.appService.getResourcesSize(name);
	}
	
	@Get(":id")
	@HttpCode(HttpStatus.OK)
	getResourceById(@Param("id", ParseIntPipe) id: number): Promise<Resource> {
		return this.appService.getResourceById(id);
	}
	
	@Post()
	@HttpCode(HttpStatus.CREATED)
	createResource(@Body() resource: Resource): Promise<string> {
		return this.appService.createResource(resource);
	}
	
	@Put()
	@HttpCode(HttpStatus.OK)
	updateResource(@Body() resource: Resource): Promise<string> {
		return this.appService.updateResource(resource);
	}
	
	@Delete(":id")
	@HttpCode(HttpStatus.OK)
	deleteResource(@Param("id", ParseIntPipe) id: number): Promise<string> {
		return this.appService.deleteResource(id);
	}
}
