<script>
    import {Direction} from "$lib/enums";

    export let sortedColumn;
    export let name;
    export let column;
    export let direction = Direction.DESC;

    function setSorting(){
        if(sortedColumn === column){
            direction = direction === Direction.ASC ? Direction.DESC : Direction.ASC;
        }
        sortedColumn = column;
    }
</script>
<div on:click={setSorting} class="cursor-pointer flex justify-start items-center">
    <span class="pr-4">{name}</span>
    {#if sortedColumn === column}
        {#if direction === Direction.ASC}
            <i class="fa-solid fa-sort-up"></i>
        {:else}
            <i class="fa-solid fa-sort-down"></i>
        {/if}
    {:else}
        <i class="fa-solid fa-sort"></i>
    {/if}
</div>
