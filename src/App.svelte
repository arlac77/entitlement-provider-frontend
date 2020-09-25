<script>
  import * as style from "./main.css";
  import base from 'consts:base';
  import { Router, Route, Outlet,redirectGuard } from "svelte-guard-history-router";
  import { Menue } from "svelte-common";
  import { session } from "./main.mjs";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";
  import ChangePassword from "./pages/ChangePassword.svelte";
  import Home from "./pages/Home.svelte";
  import Entitlements from "./pages/Entitlements.svelte";
  import Services from "./pages/Services.svelte";

  const enshureSession = redirectGuard("/login",() => !session.isValid);
</script>

<Router {base}>
  <nav>
    <Route href="/" path="*" component={Home}>
      <img class="logo" src="images/logo.svg" alt="Entitlement Provider" />
      Entitlement Provider
    </Route>
    <ul class="left">
      <li>
        <Route path="/entitlements" guards={enshureSession} component={Entitlements}>
          Entitlements
        </Route>
      </li>
      <li>
        <Route path="/services" guards={enshureSession} component={Services}>Services</Route>
      </li>
      <li>
        <Route path="/change-password" component={ChangePassword}>Change Password</Route>
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
                on:click|preventDefault={() => session.invalidate()}>
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
