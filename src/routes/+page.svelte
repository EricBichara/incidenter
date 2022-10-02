<script lang="ts">
    import {enhance} from '$app/forms';
    import {invalidateAll} from '$app/navigation';
    import type {Incident, Type} from "$lib/model";
    import type {ActionData, PageData} from "$types";
    import suite from "$lib/suite";
    import IncidentChart from "$lib/IncidentChart.svelte";
    import IncidentTable from "$lib/IncidentTable.svelte";

    /** @type {import('./$types').PageData} */
    export let data: PageData;

    /** @type {import('./$types').ActionData} */
    export let form: ActionData;

    let selectedType;

    $: incidents = data.incidents as Incident[];
    $: types = data.types as Type[];

    $: {
        types;
        selectedType = 1;
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

    function callback() {
        return async ({result}) => {
            console.log('here')
            if (result.type === 'success') {
                formState = {radio: 0}
                suite.reset();
                await invalidateAll();
            }
        };
    }
</script>
<div class="container mx-auto grid md:grid-cols-2 gap-4">

    <div class="p-6 border aspect-square shadow-lg rounded-md">
        <IncidentChart chartData={incidents}></IncidentChart>
    </div>
    <form method="POST" action="?/add" use:enhance={callback}
          class="border p-6 aspect-square shadow-lg rounded-md flex-col justify-center items-center">
        <div class="text-2xl font-bold">Add Incident</div>

        <div class="form-control mt-4">
            <label class="label" for="incident">
                <span class="label-text">Incident Number</span>
            </label>
            <input type="text" id="incident" name="code"
                   bind:value={formState.incidentId} on:input={()=>handleChange('incidentId')}
                   class:border-red-600={res.hasErrors('incidentId')}
                   class="input input-bordered"/>
            {#if res.hasErrors('incidentId')}
                <div class="text-red-400 text-sm mt-2 px-4">{res.getErrors('incidentId')}</div>
            {/if}
        </div>

        <div class="form-control mt-4">
            <label class="label cursor-pointer justify-start" for="type">
                <span class="label-text">Type</span>
            </label>
            <div class="flex flex-row items-center mb-2">
                <input id="type" bind:group={formState.radio} value={0} type="radio"
                       name="radio"
                       class="radio checked: bg-red-500 mr-2" checked
                       on:input={()=>handleChange('newtype')}/>
                <select name="selected" class="custom-select select select-bordered" value={selectedType}>
                    <option disabled>Select Type</option>
                    {#each types as option}
                        <option value={option.id}>{option.title}</option>
                    {/each}
                </select>
            </div>
            <div class="flex flex-row items-center">
                <input type="radio" name="radio" bind:group={formState.radio} value={1}
                       class="radio checked: bg-red-500 mr-2" on:input={() => handleChange('newtype')}/>
                <input bind:value={formState.newtype} name="newtype"
                       class="input input-bordered w-full" on:input={()=>handleChange('newtype')}
                       class:border-red-600={res.hasErrors('newtype')}/>
            </div>
            {#if res.hasErrors('newtype')}
                <div class="text-red-400 text-sm mt-2 px-12">{res.getErrors('newtype')}</div>
            {/if}
        </div>

        <div class="form-control my-4">
            <label class="label" for="notes">
                <span class="label-text">Notes</span>
            </label>
            <textarea name="notes" id="notes" class="textarea textarea-bordered"></textarea>
        </div>

        <button disabled={!res.valid} type="submit" class="btn btn-primary mt-2">Add Incident</button>
    </form>
</div>

<IncidentTable incidents={incidents}></IncidentTable>

<style lang="scss">
  .custom-select {
    width: calc(100% - 30px);
  }
</style>
