<script>
  import {
    Router,
    Route,
    Outlet,
    redirectGuard
  } from "svelte-guard-history-router";
  import { Menue, TopNav } from "svelte-common";
  import { base } from "./constants.mjs";
  import { session } from "./session.mjs";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";
  import ChangePassword from "./pages/ChangePassword.svelte";
  import AddUser from "./pages/AddUser.svelte";
  import Home from "./pages/Home.svelte";
  import UserRoutes from "./UserRoutes.svelte";
  import EntitlementRoutes from "./EntitlementRoutes.svelte";
  import Services from "./pages/Services.svelte";

  const guard = redirectGuard("/login", () => !session.isValid);
</script>

<Router {base}>
  <TopNav offset={42}>
    <Route href="/" path="*" component={Home}>
      <img
        class="logo"
        src="images/icon.svg"
        alt="Entitlement Provider"
        width="32"
        height="32"
      />
      Entitlements
    </Route>
    <ul class="left">
      <li>
        <UserRoutes {guard} {session}>User</UserRoutes>
      </li>
      <li>
        <EntitlementRoutes {guard} {session}>Entitlements</EntitlementRoutes>
      </li>
      <li>
        <Route path="/user/add" component={AddUser}>Add User</Route>
      </li>
      <li>
        <Route path="/user/password" component={ChangePassword}>
          Change Password
        </Route>
      </li>
      <li>
        <Route path="/services" {guard} component={Services}>Services</Route>
      </li>
    </ul>
    <ul>
      <li>
        {#if $session.isValid}
          <Menue>
            <div slot="title" class="dropdown-trigger">{$session.username}</div>
            <div slot="content" class="dropdown-menu dropdown-menu-sw">
              <a
                href="/"
                class="dropdown-item"
                on:click|preventDefault={() => session.invalidate()}
              >
                Logout
                {$session.username}
              </a>
              <div class="dropdown-divider" />
              <a href="#!" class="dropdown-item">three</a>
            </div>
          </Menue>
        {:else}
          <Route path="/login" component={Login}>Login</Route>
        {/if}
      </li>
      <li>
        <Route path="/about" component={About}>About</Route>
      </li>
    </ul>
  </TopNav>
  <main>
    <Outlet />
  </main>
</Router>
