<script>
  import * as style from "./main.css";
  import { Router, Route, Outlet } from "svelte-guard-history-router";
  import { Menue } from "svelte-common";
  import { router, session, needsSession } from "./main.mjs";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";
  import Home from "./pages/Home.svelte";
  import Entitlements from "./pages/Entitlements.svelte";
  import Services from "./pages/Services.svelte";

  function logout() {
    session.invalidate();
  }
</script>

<Router {router}>
  <nav>
    <Route path="/" component={Home}>
      <img class="logo" src="logo.svg" alt="Entitlement Provider" />
      Entitlement Provider
    </Route>
    <ul class="left">
      <li>
        <Route path="/entitlements" guards={[needsSession]} component={Entitlements}>
          Entitlements
        </Route>
      </li>
      <li>
        <Route path="/services" guards={[needsSession]} component={Services}>Services</Route>
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
                on:click|preventDefault={logout}>
                Logout {$session.username}
              </a>
              <div class="dropdown-divider" />
              <a href="#!" class="dropdown-item">three</a>
            </div>
          </Menue>
        {:else}
          <Route path="/login" component={Login}>Login</Route>
        {/if}
      </li>
      <Route path="/about" component={About}>About</Route>
    </ul>
  </nav>
  <main>
    <Outlet />
  </main>
</Router>
