import {error} from "@sveltejs/kit";
import type {PageServerLoad} from "../../.svelte-kit/types/src/routes/$types";
import {supabase} from "../lib/db";

export const load: PageServerLoad = async () => {
    const incidents = await supabase.from('incidents').select(`incidentId, created_at, types:typeId(title), notes`);

    console.log('incidents')

    if (incidents) {
        return {incidents: incidents.data};
    }

    throw error(404, 'Not found');
}

/** @type {import('./$types').Actions} */
export const actions = {

    add: async (event: unknown) => {
        const {data, error} = await supabase.from('incidents').insert({
            created_at: new Date(),
            typeId: 1,
            incidentId: Math.round(Math.random() * 10),
            notes: 'its another one'
        })
        console.log('add: ', data, error);
    },
};