<script>
  export let router;

  const route = router.route;
  const entitlements = $route.value;
</script>

<ul>
  {#each entitlements as entitlement}
    <li>{entitlement.name}</li>
  {/each}
</ul>
