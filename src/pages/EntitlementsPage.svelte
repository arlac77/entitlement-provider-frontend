<script>
  import { EntitlementBadge } from "svelte-entitlement";

  export let router;

  const route = router.route;
  const entitlements = $route.value;
</script>

<ul>
  {#each entitlements as entitlement}
    <li>
      <EntitlementBadge {entitlement} />
    </li>
  {/each}
</ul>
