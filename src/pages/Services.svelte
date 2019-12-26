<script>
  import { session } from "../main.mjs";
  import api from "consts:api";

  async function fetchServices() {
    return fetch(`${api}/services`, {
      headers: session.authorizationHeader
    }).then(response => response.json());
  }
</script>

{#await fetchServices()}
  <p>...fetching</p>
{:then services}
  <ul>
    {#each Object.values(services) as service}
      <li>{service.name} ({service.state})</li>
    {/each}
  </ul>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
