<script lang="ts">

    import {onMount} from 'svelte';
    import {Chart, registerables} from "chart.js";
    import type {PageData} from './$types';
    import {enhance} from '$app/forms';

    /** @type {import('./$types').PageData} */
    export let data: PageData;

    $: incidents = data.incidents;

    let chartValues = [0, 10, 5, 2, 20, 30, 45];
    let chartLabels = ['January',
        'February',
        'March',
        'April',
        'May',
        'June',];
    const tableData = {
        labels: chartLabels,
        datasets: [{
            label: 'My First dataset',
            data: chartValues,
            backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
        }]
    };
    let chartCanvas: HTMLCanvasElement;
    let chart;

    onMount(async () => {
        Chart.register(...registerables);
        const ctx = chartCanvas.getContext('2d');
        chart = new Chart(ctx, {
            data: tableData,
            type: 'pie',
            options: {
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: "left"
                    }
                }
            }
        })

        console.log(incidents)
    });


</script>
<div class="mx-auto grid md:grid-cols-2 gap-10">

    <div>
        <canvas bind:this={chartCanvas} id="myChart"></canvas>

    </div>
    <form method="POST" action="?/add" use:enhance>
        <div class="text-2xl font-bold">Add Incident</div>

        <div class="form-control w-full max-w-md">
            <label class="label" for="incident">
                <span class="label-text">Incident Number</span>
            </label>
            <input type="text" id="incident" name="code" class="input input-bordered"/>
        </div>

        <div class="form-control">
            <label class="label cursor-pointer justify-start" for="type">
                <span class="label-text">Type</span>
            </label>
            <div class="flex flex-row items-center mb-2 w-full max-w-md">
                <input id="type" type="radio" name="radio" class="radio checked: bg-red-500 mr-2" checked/>
                <input class="input input-bordered w-full"/>
            </div>
            <div class="flex flex-row items-center w-full max-w-md">
                <input type="radio" name="radio" class="radio checked: bg-red-500 mr-2"/>
                <input class="input input-bordered w-full"/>
            </div>
        </div>

        <div class="form-control">
            <label class="label" for="notes">
                <span class="label-text">Notes</span>
            </label>
            <textarea name="notes" id="notes" class="textarea textarea-bordered max-w-md"></textarea>
        </div>

        <button type="submit" class="btn btn-primary mt-1">Add Incident</button>

    </form>

</div>

<div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
                <table class="min-w-full text-center">
                    <thead class="border-b bg-gray-50">
                    <tr>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                            Incident ID
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                            Type
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                            Created At
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                            Notes
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each incidents as incident}
                        <tr class="bg-white border-b">
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {incident.incidentId}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {new Date(incident.created_at).toLocaleDateString()}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {incident.types.title}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
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


<style lang="scss">

</style>