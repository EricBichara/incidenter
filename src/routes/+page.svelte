<script lang="ts">

    import {onMount} from 'svelte';
    import {Chart, registerables} from "chart.js";
    import type {PageData} from './$types';
    import {enhance} from '$app/forms';
    import type {Incident} from "$lib/model";

    /** @type {import('./$types').PageData} */
    export let data: PageData;

    $: incidents = data.incidents as Incident[];

    let chartValues = [0, 10, 5, 2, 20, 30, 45];
    let chartLabels = ['January',
        'February',
        'March',
        'April',
        'May',
        'June',];

    let chartCanvas: HTMLCanvasElement;
    let chart;

    function prepareData() {
        let map = new Map();
        incidents.forEach((incident) => {
            if (map.get(incident.types.title)) {
                map.set(incident.types.title, 1 + map.get(incident.types.title));
            } else {
                map.set(incident.types.title, 1);
            }
        })
        chartLabels = Array.from(map.keys());
        chartValues = Array.from(map.values());
        console.log('labels', chartLabels)
        console.log('values', chartValues)
    }

    onMount(async () => {
        prepareData();

        Chart.register(...registerables);
        const tableData = {
            labels: chartLabels,
            datasets: [{
                label: 'My First dataset',
                data: chartValues,
                backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
            }]
        };

        const ctx = chartCanvas.getContext('2d');
        if (ctx) {
            chart = new Chart(ctx, {
                data: tableData,
                type: 'pie',
                options: {
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            })
        }
    });


</script>
<div class="mx-auto grid md:grid-cols-2 gap-10">

    <div class="px-14">
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
                        <tr class="bg-white border-b">
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-left">
                                {incident.incidentId}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-left">
                                {incident.types.title}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-left">
                                {new Date(incident.created_at).toLocaleDateString()}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-left">
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