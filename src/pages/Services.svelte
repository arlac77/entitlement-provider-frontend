<script>
  import { session } from "../main.mjs";
  import api from "consts:api";

  const sh = 50;
  const sw = 100;

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

          let ey = 10 + 5;
          for (const endpoint of Object.values(service.endpoints)) {
            endpoint.x = sw - 10;
            endpoint.y = ey;
            if(endpoint.connected === undefined) {endpoint.connected = [];}
            ey += 12;
          }

          service.w = sw;
          service.h = ey > sh ? ey : sh;

          y += service.h + 10;
        }

        return json;
      });
  }

  let width = 400;
  let height = 700;

  function endpointFor(services,exp) {
    const m = exp.match(/service\((\w+)\)\.(\w+)/);

    if(m) {
      return services[m[1]].endpoints[m[2]];
    }
  }
</script>

<style>
  svg {
    width: 33%;
    height: 33%;
  }

  .service rect {
    stroke: none;
    opacity: 0.35;
  }
</style>

{#await fetchServices()}
  <p>...fetching</p>
{:then services}
  <svg viewbox="0 0 {width} {height}">
    <g class="services">
      {#each Object.values(services) as service}
        <g class="service" transform="translate({service.x},{service.y})">
          <rect
            x="0"
            y="0"
            width={service.w}
            height={service.h}
            fill={service.state === 'running' ? 'green' : 'red'} />
          <text x="8" y="22">{service.name}</text>
          {#each Object.values(service.endpoints) as endpoint}
            <circle cx={endpoint.x} cy={endpoint.y} r="5" />
            <!--{#each endpoint.connected as connected}
              <path d="C {endpoint.x} {endpoint.y} 0 0 50 50" stroke="blue" fill="transparent"/>
            {/each}-->
          {/each}
        </g>
      {/each}
    </g>
  </svg>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
