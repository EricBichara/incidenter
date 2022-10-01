<script lang="ts">
    import {Chart, registerables} from "chart.js";
    import {enhance} from '$app/forms';
    import type {Incident} from "$lib/model";
    import {onMount} from "svelte";
    import type {ActionData, PageData} from "./$types";
    import suite from "$lib/suite";

    /** @type {import('./$types').PageData} */
    export let data: PageData;

    /** @type {import('./$types').ActionData} */
    export let form: ActionData;

    let chartValues;
    let chartLabels;
    let typeOptions = [];

    let selectedType;
    let radio = 0;

    let chartCanvas: HTMLCanvasElement;
    let chart;

    $: incidents = data.incidents as Incident[];

    $: {
        incidents;
        if (chart) {
            prepareData();
            chart.data.labels = chartLabels;
            chart.data.datasets[0].data = chartValues;
            chart.update();
        }
    }

    //FORM VALIDATION
    let res = suite.get();
    let formState = {radio: 0};

    $: {
        res = suite(formState, field);
    }

    let field = 'none';

    function handleChange(changedField) {
        field = changedField;
    }

    onMount(async () => {
        prepareData();
        createChart();
    });

    function prepareData() {
        let map = new Map();
        typeOptions = [];
        incidents.forEach((incident) => {
            if (map.get(incident.types.title)) {
                map.set(incident.types.title, 1 + map.get(incident.types.title));
            } else {
                map.set(incident.types.title, 1);
                typeOptions = [...typeOptions, incident.types];
            }
        })
        chartLabels = Array.from(map.keys());
        chartValues = Array.from(map.values());
    }

    function createChart() {
        Chart.register(...registerables);
        const tableData = {
            labels: chartLabels,
            datasets: [{
                label: 'Incidenter',
                data: chartValues,
                backgroundColor: ["#191919", "#2D4263", "#C84B31", "#ECDBBA", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
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
    }

</script>
<div class="mx-48 grid lg:grid-cols-2 gap-4">

    <div class="p-8 border aspect-square shadow-lg rounded-md">
        <canvas bind:this={chartCanvas} id="myChart"></canvas>
    </div>
    <form method="POST" action="?/add" use:enhance
          class="border p-8 aspect-square shadow-lg rounded-md flex-col justify-center items-center">
        <div class="text-2xl font-bold">Add Incident</div>

        <div class="form-control w-full max-w-md">
            <label class="label" for="incident">
                <span class="label-text">Incident Number</span>
            </label>
            <input type="text" id="incident" name="code"
                   bind:value={formState.incidentId} on:input={()=>handleChange('incidentId')}
                   class:border-red-600={res.hasErrors('incidentId')}
                   class="input input-bordered"/>
            {#if res.hasErrors('incidentId')}
                <div class="decoration-red-400">{res.getErrors('incidentId')}</div>
            {/if}
        </div>

        <div class="form-control w-full max-w-md">
            <label class="label cursor-pointer justify-start" for="type">
                <span class="label-text">Type</span>
            </label>
            <div class="flex flex-row items-center mb-2 max-w-md">
                <input id="type" bind:group={formState.radio} value={0} type="radio"
                       name="radio"
                       class="radio checked: bg-red-500 mr-2" checked/>
                <select name="selected" class="select select-bordered" value={selectedType}>
                    <option disabled>Select Type</option>
                    {#each typeOptions as option}
                        <option value={option.id}>{option.title}</option>
                    {/each}
                </select>
            </div>
            <div class="flex flex-row items-center w-full max-w-md">
                <input type="radio" name="radio" bind:group={formState.radio} value={1}
                       class="radio checked: bg-red-500 mr-2"/>
                <input bind:value={formState.newtype} name="newtype"
                       class="input input-bordered w-full" on:input={()=>handleChange('newtype')}/>
                {#if res.hasErrors('newtype')}
                    <div class="decoration-red-400">{res.getErrors('newtype')}</div>
                {/if}
            </div>
        </div>

        <div class="form-control">
            <label class="label" for="notes">
                <span class="label-text">Notes</span>
            </label>
            <textarea name="notes" id="notes" class="textarea textarea-bordered max-w-md"></textarea>
        </div>

        <button disabled={!res.isValid()} type="submit" class="btn btn-primary mt-2">Add Incident</button>

    </form>

    {#if form?.missing}
        <div>Some fiels are missing</div>
    {/if}
</div>

<div class="flex flex-col mx-32 mt-6">
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


<style lang="scss">

</style>