<script lang="ts">
    import type {Incident} from "$lib/model";

    export let incidents: Incident[];
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
                            Type
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Created At
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