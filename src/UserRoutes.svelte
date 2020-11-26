<script>
  import {
    Route,
    DetailRoute,
    MasterRoute,
    NamedObjectLink
  } from "svelte-guard-history-router";
  import UsersPage from "./pages/UsersPage.svelte";
  import UserPage from "./pages/UserPage.svelte";
  import EntitlementsPage from "./pages/EntitlementsPage.svelte";
  import { Entitlement } from "./entitlement.mjs";
  import { User } from "./user.mjs";
  import { fetchIterator } from "./util.mjs";

  export let session;
  export let guards;
</script>

<Route
  path="/user"
  factory={MasterRoute}
  iteratorFor={transition => fetchIterator('/user', User, session)}
  objectInstance={User}
  component={UsersPage}
  {guards}>
  <slot />
  <Route
    path="/:user"
    propertyMapping={{ user: 'name' }}
    linkComponent={NamedObjectLink}
    factory={DetailRoute}
    component={UserPage}>
    <Route
      path="/entitlements"
      iteratorFor={transition => fetchIterator(`/user/${transition.params.user}/entitlements`, Entitlement, session)}
      factory={MasterRoute}
      component={EntitlementsPage} />
  </Route>
</Route>
