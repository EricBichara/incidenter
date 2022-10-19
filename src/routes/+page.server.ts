import type {PageServerLoad, Actions} from "./$types";
import {supabase} from "$lib/db";
import type {Incident, Type} from "$lib/model";
import {error as err, invalid} from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    const incidents = await supabase.from('incidents').select(`incidentId, created_at, types:typeId(title, id), notes`);
    const types = await supabase.from('types').select();
    if (incidents) {
        return {incidents: incidents.data as Incident[], types: types.data as Type[]};
    }

    throw err(404, 'Not found');
}

export const actions: Actions = {

    delete: async ({request}) => {
        const form = await request.formData();
        const incidentNumber: string = form.get('incidentId') as string;

        const response = await supabase.from('incidents').delete().eq('incidentId', incidentNumber);

        if (response.error) {
            throw err(400, response.error.message);
        }
    },

    add: async ({request}) => {

        const form = await request.formData();
        const incidentNumber: string = form.get('code') as string;
        const newTypeSelected: boolean = form.get('radio') === '1';
        const selectedType: number = +(form.get('selected') as string);
        const newType: string = form.get('newtype') as string;
        const notes: string = form.get('notes') as string;


        if (!incidentNumber || (newTypeSelected && !newType)) {
            return invalid(400, {missing: true});
        }

        //Get types
        const typesResponse = await supabase.from('types').select(`id, title`);
        const types: Type[] = typesResponse.data as Type[];
        //Add if new type
        const isNewType = types.find((type: Type) => type.title == newType) == undefined;

        if (newTypeSelected && isNewType) {
            const typesResult = await supabase.from('types').insert({
                title: newType
            })

            if (typesResult.error) {
                throw err(404, {message: typesResult.error.message});
            }

            const incidents1 = await supabase.from('incidents').insert({
                    typeId: typesResult.data[0].id,
                    incidentId: incidentNumber,
                    notes: notes
                }
            )

            if (incidents1.error) {
                throw err(404, {message: incidents1.error.message});
            }
        } else {
            const incidents2 = await supabase.from('incidents').insert({
                    typeId: selectedType,
                    incidentId: incidentNumber,
                    notes: notes
                }
            )
            if (incidents2.error) {
                if (incidents2.error.code === '23505') {
                    return invalid(400, {incidentNumber, duplicate: true});
                } else {
                    throw err(404, {message: incidents2.error.message});
                }
            }
        }
    },
};