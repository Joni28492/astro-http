import { Clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {

	await db.insert(Clients).values([
		{id: 1, name: 'Karim', age: 35, isActive:true},
		{id: 2, name: 'Fernando', age: 18, isActive:false},
		{id: 3, name: 'Carlos', age: 22, isActive:true},
		{id: 4, name: 'Melisa', age: 25, isActive:false},
		{id: 5, name: 'Joni', age: 32, isActive:true},
	])



	console.log("SEED EXECUTED!!!");
}
