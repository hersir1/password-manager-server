import { Injectable, OnModuleInit } from "@nestjs/common";
import { orderBy, slice, filter } from "lodash";
import { Resource } from "../model/resource";

@Injectable()
export class SupportService implements OnModuleInit {
	
	constructor() {
	}
	
	onModuleInit(): any {
		/*let resources: Resource[] = [
			{
				id: 1,
				name: 'name1',
				password: 'password1'
			},
			{
				id: 2,
				name: 'name2',
				password: 'password2'
			},
			{
				id: 3,
				name: 'name3',
				password: 'password3'
			},
			{
				id: 4,
				name: 'name4',
				password: 'password4'
			},
			{
				id: 5,
				name: 'name5',
				password: 'password5'
			},
			{
				id: 6,
				name: 'name6',
				password: 'password6'
			},
			{
				id: 7,
				name: 'name7',
				password: 'password7'
			},
			{
				id: 8,
				name: 'name8',
				password: 'password8'
			},
			{
				id: 9,
				name: 'name9',
				password: 'password9'
			},
			{
				id: 10,
				name: 'name10',
				password: 'password10'
			},
			{
				id: 11,
				name: 'name11',
				password: 'password11'
			},
			{
				id: 12,
				name: 'name12',
				password: 'password12'
			}
		];
		
		console.log(this.getPortion(resources, 1, 50));*/
	}
	
	searchByField(resources: Resource[], name: string): Resource[] {
		return filter(resources, {name});
	}
	
	sortArray(resources: Resource[], sortColumn: string, sortValue: "asc" | "desc"): Resource[] {
		return orderBy(resources, [sortColumn], [sortValue]);
	}
	
	getPortion(resources: Resource[], pageIndex: number, pageSize: number): Resource[] {
		let offset = (pageIndex - 1) * pageSize;
		
		return slice(slice(resources, offset), 0, pageSize);
	}
	
}
