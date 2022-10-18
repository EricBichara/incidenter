<script lang="ts">
    import type {Incident} from "$lib/model";
    import SortingHeader from "$lib/SortingHeader.svelte";
    import {Direction} from "$lib/enums";

    export let incidents: Incident[];

    $:  {

        incidents.sort((n1, n2) => {
            const val1 = sortColumn === 'types' ? n1['types']['id'] : n1[sortColumn];
            const val2 = sortColumn === 'types' ? n2['types']['id'] : n1[sortColumn];
            if (val1 > val2) {
                return sortDirection === Direction.DESC ? 1 : -1;
            }

            if (val1 < val2) {
                return sortDirection == Direction.DESC ? -1 : 1;
            }

            return 0;
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
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>