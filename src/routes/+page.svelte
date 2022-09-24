<script lang="ts">

    import {onMount} from 'svelte';
    import {Chart, registerables} from "chart.js";

    let chartValues = [0, 10, 5, 2, 20, 30, 45];
    let chartLabels = ['January',
        'February',
        'March',
        'April',
        'May',
        'June',];
    const data = {
        labels: chartLabels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: chartValues,
        }]
    };
    let chartCanvas: HTMLCanvasElement;
    let chart;

    onMount(async () => {
        Chart.register(...registerables);
        const ctx = chartCanvas.getContext('2d');
        new Chart(ctx, {
            data: data,
            type: 'line'
        })
    });


</script>
<div class="mx-auto p-10 grid md:grid-cols-2 gap-2">

    <div>
        <canvas bind:this={chartCanvas} id="myChart"></canvas>
    </div>
    <div>
        <div class="text-2xl font-bold">Add Incident</div>

        <div class="form-control w-full max-w-md">
            <label class="label" for="incident">
                <span class="label-text">Incident Number</span>
            </label>
            <input type="text" id="incident" class="input input-bordered"/>
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
            <textarea id="notes" class="textarea textarea-bordered max-w-md"></textarea>
        </div>

        <button type="submit" class="btn btn-primary mt-1">Add Incident</button>

    </div>

</div>


<style lang="scss">

</style>