<script>
  import { session } from "../main.mjs";
  import api from "consts:api";

  const sh = 50;
  const sw = 100;
  const ex = 80;

  async function fetchServices() {
    const response = await fetch(`${api}/services`, {
      headers: session.authorizationHeader
    });

    const json = await response.json();

    const endpoints = new Set();

    let cx = 110;
    let y = 0;
    for (const service of Object.values(json)) {
      service.x = 10;
      service.y = y;

      let ey = 10 + 20 + 5;
      for (const [name, endpoint] of Object.entries(service.endpoints)) {
        const ci = `service(${service.name}).${name}`;

        if (endpoint.interceptors === undefined) {
          endpoint.interceptors = [];
        } else if (!Array.isArray(endpoint.interceptors)) {
          endpoint.interceptors = [endpoint.interceptors];
        }

        let ix = ex - 4;

        endpoint.interceptors = endpoint.interceptors.map(i => {
          ix = ix + 10;
          return { x: ix, i };
        });

        endpoint.name = name;
        endpoint.service = service;
        endpoint.x = ex;
        endpoint.y = ey;

        if (endpoint.connected === undefined) {
          endpoint.connected = [];
        } else if (!Array.isArray(endpoint.connected)) {
          endpoint.connected = [endpoint.connected];
        }
        endpoint.connected = endpoint.connected
          .map(c => {
            let first = true;

            for (const i of [`${ci}-${c}`, `${c}-${ci}`]) {
              if (endpoints.has(i)) {
                first = false;
              } else {
                endpoints.add(i);
              }
            }

            cx = cx + 5;
            return { x: cx, target: c, first };
          })
          .filter(c => c.first);

        ey += 12;
      }

      service.w = sw;
      service.h = ey > sh ? ey : sh;

      y += service.h + 10;
    }

    return json;
  }

  let width = 400;
  let height = 1000;

  function endpointFor(services, exp) {
    const m = exp.match(/service\((\w+)\)\.(.+)/);

    if (m) {
      return services[m[1]].endpoints[m[2]];
    }
  }

  function coordsFor(services, exp, current) {
    const endpoint = endpointFor(services, exp);
    return `V${endpoint.service.y +
      endpoint.y -
      current.service.y -
      current.y}H${endpoint.x}`;
  }

  const stateColor = {
    running: "green",
    starting: "green",
    stopped: "gray",
    stoppin: "gray",
    failed: "red"
  };
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

  .service rect:hover {
    opacity: 0.5;
  }

  .endpoint {
    text-anchor: end;
    font-size: 0.8em;
    overflow: visible;
  }

  .connection {
    fill: none;
    stroke: black;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .connection:hover {
    stroke-width: 5;
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
            fill={stateColor[service.state]} />
          <text x="8" y="22">{service.name}</text>
          {#each Object.values(service.endpoints) as endpoint}
            <g
              class="endpoint"
              transform="translate({endpoint.x - 60},{endpoint.y})">

              <text x={72} y={3}>{endpoint.name}</text>
              <circle
                cx="80"
                cy="0"
                r="5"
                fill={endpoint.open ? 'black' : 'gray'} />
              {#each endpoint.connected as connected}
                <path
                  class="connection"
                  d="M80 0H{connected.x}{coordsFor(services, connected.target, endpoint)}" />
              {/each}
              {#each endpoint.interceptors as interceptor}
                <rect x={interceptor.x} y="-4" width="8" height="8" />
              {/each}
            </g>
          {/each}
        </g>
      {/each}
    </g>
  </svg>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
