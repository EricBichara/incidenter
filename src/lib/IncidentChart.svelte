<script lang="ts">
    import {Chart, registerables} from "chart.js";
    import type {Incident} from "$lib/model";
    import {onMount} from "svelte";

    export let chartData: Incident[];

    let chartValues;
    let chartLabels;

    let chartCanvas: HTMLCanvasElement;
    let chart;

    $: {
        chartData;
        if (chart){
            prepareData();
            chart.data.labels = chartLabels;
            chart.data.datasets[0].data = chartValues;
            chart.update();
        }
    }

    onMount(()=>{
        createChart();
        prepareData();
    })


    function prepareData() {
        let map = new Map();
        chartData.forEach((incident) => {
            if (map.get(incident.types.title)) {
                map.set(incident.types.title, 1 + map.get(incident.types.title));
            } else {
                map.set(incident.types.title, 1);
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

<canvas bind:this={chartCanvas} id="myChart"></canvas>