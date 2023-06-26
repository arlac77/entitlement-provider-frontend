<script>
  import { ObjectLink } from "svelte-guard-history-router";
  export let router;

  const user = router.value;
</script>

<h1>{user.cn}</h1>

<table class="bordered striped hoverable">
  <thead>
    <tr>
      <th id="name">name</th>
      <th id="value">value</th>
    </tr>
  </thead>
  <tbody>
    {#each Object.entries(user) as kv}
    <tr>
      <td>{kv[0]}</td>
      <td>{kv[1]}</td>
    </tr>
  {/each}
  </tbody>
</table>

<ObjectLink object={user} suffix="/entitlements">Entitlements</ObjectLink>
