<script>
  import { Route, DetailRoute, MasterRoute } from "svelte-guard-history-router";
  import UsersPage from "./pages/UsersPage.svelte";
  import UserPage from "./pages/UserPage.svelte";
  import UserLink from "./components/UserLink.svelte";
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
    propertyMapping={{ interface: 'name' }}
    linkComponent={UserLink}
    factory={DetailRoute}
    component={UserPage} />
</Route>
