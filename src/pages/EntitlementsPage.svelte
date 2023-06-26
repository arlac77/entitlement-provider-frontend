<script>
  import { EntitlementBadges } from "svelte-entitlement";

  export let router;

  const entitlements = router.value;
</script>

<EntitlementBadges {entitlements} />
