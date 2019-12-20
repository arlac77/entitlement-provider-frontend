<script>
  import { session } from "../main.mjs";
  import api from "consts:api";

  async function fetchEntitlements() {
    return fetch(`${api}/entitlements`, {
      headers: session.authorizationHeader
    });
  }
</script>

{#await fetchEntitlements()}
  <p>...fetching</p>
{:then entitlements}
  <ul>
    {#each entitlements as entitlement}
      <li>{entitlement.name}</li>
    {/each}
  </ul>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
