<script>
  import { ObjectLink } from "svelte-guard-history-router";
  export let router;

  const route = router.route;
  const user = $route.value;
</script>

<h1>{user.cn}</h1>

<ul>
  {#each Object.entries(user) as kv}
    <li>{kv[0]} : {kv[1]}</li>
  {/each}
</ul>

<ObjectLink object={user} suffix="/entitlements">Entitlements</ObjectLink>
