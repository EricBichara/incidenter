<script lang="ts">
    import type {Incident} from "$lib/model";
    import SortingHeader from "$lib/SortingHeader.svelte";
    import {Direction} from "$lib/enums";
    import {enhance} from '$app/forms';

    export let incidents: Incident[];

    $:  {
        incidents.sort((n1, n2) => {
            let val1;
            let val2;
            if (sortColumn === 'types') {
                val1 = n1['types']['id'];
                val2 = n2['types']['id'];
            } else {
                val1 = new Date(n1[sortColumn]);
                val2 = new Date(n2[sortColumn]);
            }

            if (sortColumn === 'created_at') {
                return sortDirection === Direction.DESC ? val1 - val2 : val2 - val1;
            } else {
                if (val1 > val2) {
                    return sortDirection === Direction.DESC ? 1 : -1;
                }

                if (val1 < val2) {
                    return sortDirection == Direction.DESC ? -1 : 1;
                }

                return 0;
            }

        });
        incidents = incidents;
    }

    let sortColumn = 'types';
    let sortDirection = Direction.ASC;

</script>


<div class="container mx-auto flex flex-col mt-6">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
                <table class="min-w-full text-center">
                    <thead class="border-b bg-gray-50">
                    <tr>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Incident ID
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            <SortingHeader name="Type" column="types" bind:sortedColumn={sortColumn}
                                           bind:direction={sortDirection}></SortingHeader>
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            <SortingHeader name="Created On" column="created_at" bind:sortedColumn={sortColumn}
                                           bind:direction={sortDirection}></SortingHeader>
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Notes
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                            Delete
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each incidents as incident}
                        <tr class="bg-white border-b hover:bg-gray-100">
                            <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap text-left font-medium">
                                {incident.incidentId}
                            </td>
                            <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap text-left font-medium">
                                {incident.types.title}
                            </td>
                            <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap text-left font-medium">
                                {new Date(incident.created_at).toLocaleDateString()}
                            </td>
                            <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap text-left font-medium">
                                {incident.notes}
                            </td>
                            <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap text-center font-medium">
                                <form action="/?/delete" use:enhance>
                                    <input type="hidden" name="incidentId" value={incident.incidentId}/>
                                    <button type="submit" class="btn btn-circle btn-outline"><i class="fa-solid fa-trash"></i></button>
                                </form>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>