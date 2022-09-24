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
    let ctx;
    let chartCanvas;
    let chart;

    onMount(async () => {
        Chart.register(...registerables);
        const ctx = chartCanvas.getContext('2d');
        const chart = new Chart(ctx, {
            data: data,
            type: 'line'
        })
    });

</script>

<canvas bind:this={chartCanvas} id="myChart"></canvas>

<div class="my-text">
    <h1 class="my-text__boat text-3xl font-bold underline text-blue-600 hover:shadow-2xl">Welcome to SvelteKit</h1>
</div>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button class="btn btn-primary">I'm here</button>


<!-- The button to open modal -->
<label for="my-modal" class="btn modal-button">open modal</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal" class="modal-toggle"/>
<div class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
        <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
        <div class="modal-action">
            <label for="my-modal" class="btn">Yay!</label>
        </div>
    </div>
</div>


<style lang="scss">
  .my-text {
    &__boat {
      color: red;
    }
  }
</style>