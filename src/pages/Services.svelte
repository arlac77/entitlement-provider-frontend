<script>
  import { session } from "../main.mjs";
  import api from "consts:api";

  async function fetchServices() {
    return fetch(`${api}/services`, {
      headers: session.authorizationHeader
    });
  }
</script>

{#await fetchServices()}
  <p>...fetching</p>
{:then services}
  <ul>
    {#each services as service}
      <li>{service.name}</li>
    {/each}
  </ul>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
