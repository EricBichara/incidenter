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
<div class="mx-auto p-10">
    <canvas bind:this={chartCanvas} id="myChart"></canvas>

    <div class="my-text">
        <h1 class="my-text__boat text-3xl font-bold underline text-blue-600 hover:shadow-2xl">Welcome to SvelteKit</h1>
    </div>

    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
    <button class="btn btn-primary">I'm here</button>

</div>



<style lang="scss">
  .my-text {
    &__boat {
      color: red;
    }
  }
</style>