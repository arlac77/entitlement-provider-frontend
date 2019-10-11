<script>
  import { Outlet, link, active } from "svelte-guard-history-router";
  import { Menue } from "svelte-common";
  import { router, session } from "./main.mjs";

  function logout() {
    session.invalidate();
  }
</script>

<nav>
  <a href="/" use:link={router} use:active={router}>
    <img class="logo" src="hook_ci.svg" alt="Entitlement Provider" />
    Entitlement Provider
  </a>
  <ul class="left">
    <li>
      <a href="/entitelments" use:link={router} use:active={router}>Entitelments</a>
    </li>
  </ul>
  <ul>
    <li>
      {#if $session.isValid}
        <Menue>
          <div slot="title" class="dropdown-trigger">{$session.username}</div>
          <ul slot="content" class="dropdown-content">
            <li>
              <a href="/" on:click|preventDefault={logout}>
                Logout {$session.username}
              </a>
            </li>
            <li class="divider" />
            <li>
              <a href="#!">three</a>
            </li>
          </ul>
        </Menue>
      {:else}
        <a href="/login" use:link={router} use:active={router}>Login</a>
      {/if}
    </li>
  </ul>
</nav>
<main>
  <Outlet {router} />
</main>
