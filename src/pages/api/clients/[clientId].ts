export const prerender = false;

import type { APIRoute } from 'astro';
import { Clients, db, eq } from 'astro:db';

export const GET: APIRoute = async({params, request})=>{

    const clientId = params.clientId

    const body = { method: 'GET', clientId }
    return new Response(JSON.stringify(body), {status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const PATCH: APIRoute = async({params, request})=>{


    const clientId = params.clientId ?? ''

   
    try {
        const {id, ...body} = await request.json()

        //updata xxx=xxx, from Tabla ?? where ???
        const results = await db.update(Clients).set(body)
            .where( eq(Clients.id, +clientId)) //drizel utilities
        //no tenemos una opcion para que regrese la respuesta la hacemos nosotros
        const updatedClient = await db.select().from(Clients).where(eq(Clients.id, +clientId))
        
        return new Response(JSON.stringify(updatedClient.at(0)), {status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({msg: "No Body Found"}), {status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}



export const DELETE: APIRoute = async({params, request})=>{

    const clientId = params.clientId ?? ''

    const {rowsAffected} =await db.delete(Clients).where(eq(Clients.id, +clientId))

    if(rowsAffected > 0) {
        return new Response(JSON.stringify({msg: 'Deleted'}), {status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
    }
    return new Response(JSON.stringify({msg: `Client with id ${clientId} not found`}), {status: 404,
        headers: {
            'Content-Type': 'application/json'
        }
    })

}