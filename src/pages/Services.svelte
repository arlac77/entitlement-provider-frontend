<script>
  import { session } from "../main.mjs";
  import api from "consts:api";

  const sh = 40;
  const sw = 140;

  async function fetchServices() {
    return fetch(`${api}/services`, {
      headers: session.authorizationHeader
    })
      .then(response => response.json())
      .then(json => {
        let y = 0;
        for (const service of Object.values(json)) {
          service.x = 10;
          service.y = y;
          y += sh;
        }

        return json;
      });
  }

  let i = 0;

  let width = 500;
  let height = 800;
</script>

<style>
  svg {
    width: 100%;
    height: 100%;
  }

  .services rect {
    fill: rgb(35, 170, 17);
    stroke: none;
    opacity: 0.65;
  }
</style>

{#await fetchServices()}
  <p>...fetching</p>
{:then services}
  <svg>
    <g class="services">
      {#each Object.values(services) as service}
        <rect x={service.x} y={service.y} width={sw} height={sh - 10} />
        <text x={service.x + 5} y={service.y + 18}>
          {service.name} ({service.state})
        </text>
      {/each}
    </g>
  </svg>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
