import {error} from "@sveltejs/kit";
import type {PageServerLoad, Actions} from "./$types";
import {supabase} from "../lib/db";

export const load: PageServerLoad = async () => {
    const incidents = await supabase.from('incidents').select(`incidentId, created_at, types:typeId(title, id), notes`);

    console.log('incidents load')

    if (incidents) {
        return {incidents: incidents.data};
    }

    throw error(404, 'Not found');
}

/** @type {import('./$types').Actions} */
export const actions: Actions = {

    add: async ({request}) => {
        const form = await request.formData();
        /*const {data, error} = await supabase.from('incidents').insert({
            created_at: new Date(),
            typeId: 1,
            incidentId: Math.round(Math.random() * 10),
            notes: 'its another one'
        })
        console.log('add: ', data, error);*/
        console.log('form', form.get('code'), form.get('selected'), form.get('radio'), form.get('newtype'), form.get('notes'))
    },
};