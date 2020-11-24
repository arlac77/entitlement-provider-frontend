<script>
  import { Route, DetailRoute, MasterRoute } from "svelte-guard-history-router";
  import EntitlementsPage from "./pages/EntitlementsPage.svelte";
  import { Entitlement } from "./entitlement.mjs";
  import { fetchIterator } from "./util.mjs";

  export let session;
  export let guards;
</script>

<Route
  path="/entitlement"
  factory={MasterRoute}
  iteratorFor={transition => fetchIterator('/entitlement', Entitlement, session)}
  objectInstance={Entitlement}
  component={EntitlementsPage}
  {guards}>
  <slot />
</Route>
