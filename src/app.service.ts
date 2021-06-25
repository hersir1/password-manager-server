import { Injectable } from "@nestjs/common";
import { Resource } from "./model/resource";
import * as fs from "fs";
import { SupportService } from "./services/support.service";

@Injectable()
export class AppService {
	
	constructor(private supportService: SupportService) {
	}
	
	async getResources(
		pageIndex: number,
		pageSize: number,
		sortColumn?: string,
		sortValue?: 'asc' | 'desc' | null,
		name?: string
	): Promise<Resource[]> {
		let resources: Resource[] = this.readDB();
		
		if (name) {
			resources = this.supportService.searchByField(resources, name);
		}
		if (sortValue && sortColumn) {
			resources = this.supportService.sortArray(resources, sortColumn, sortValue);
		}
		resources = this.supportService.getPortion(resources, pageIndex, pageSize);
		return resources;
	}
	
	async getResourcesSize(
		name: string
	): Promise<number> {
		let resources: Resource[] = this.readDB();
		
		if (name) {
			resources = this.supportService.searchByField(resources, name);
		}
		return resources.length;
	}
	
	async getResourceById(id: number): Promise<Resource> {
		let resourcesArr: Resource[] = this.readDB();
		
		return resourcesArr.find(elem => elem.id === id);
	}
	
	async createResource(resource: Resource): Promise<string> {
		let resources: Resource[] = this.readDB();
		
		resources.push(resource);
		
		this.writeDB(resources);
		
		return 'Информация успешно добавлена';
	}
	
	async updateResource(resource: Resource): Promise<string> {
		let resources: Resource[] = this.readDB();
		
		resources.filter(elem => elem.id !== resource.id).push(resource);
		
		this.writeDB(resources);
		
		return 'Информация успешно обновлена';
	}
	
	async deleteResource(id: number): Promise<string> {
		let resources: Resource[] = this.readDB();
		
		resources.filter(elem => elem.id !== id);
		
		this.writeDB(resources);
		
		return 'Информация успешно удалена';
	}
	
	private readDB(): Resource[] {
		try {
			return JSON.parse(fs.readFileSync(`${process.cwd()}/src/db/db.json`, "utf-8"));
		} catch (e) {
			throw e;
		}
	}
	
	private writeDB(resources: Resource[]): void {
		try {
			fs.writeFileSync(`${process.cwd()}/src/db/db.json`, JSON.stringify(resources), "utf-8");
		} catch (e) {
			throw e;
		}
	}
	
}
