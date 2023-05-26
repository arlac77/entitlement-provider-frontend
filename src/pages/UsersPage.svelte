<script>
  import { ObjectLink } from "svelte-guard-history-router";
  import { sortable, sorter, filter, keyPrefixStore } from "svelte-common";

  export let router;

  const sortBy = keyPrefixStore(router.searchParamStore, "sort.");
  const filterBy = keyPrefixStore(router.searchParamStore, "filter.");
</script>

<table class="bordered striped hoverable">
  <thead>
    <tr>
      <th id="name" use:sortable={sortBy}
        >Name<input bind:value={$filterBy.cn} placeholder="filter cn" /></th
      >
    </tr>
  </thead>
  <tbody>
    {#each router.value
      .filter(filter($filterBy))
      .sort(sorter($sortBy)) as user, i (user.cn)}
      <tr>
        <td>
          <ObjectLink object={user} />
        </td>
      </tr>
    {/each}
  </tbody>
</table>
