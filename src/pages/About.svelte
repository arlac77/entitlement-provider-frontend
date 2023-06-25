<script>
  import {
    About,
    ApplicationDetails,
    SessionDetails,
    ServerDetails,
    ServiceWorkerDetails,
    ServiceWorkerRegistrationDetails
  } from "svelte-common";
  import { websocketStore } from "svelte-websocket-store";
  import { serviceWorker, serviceWorkerRegistration } from "../service-worker/registration.mjs";
  import { session } from "../session.mjs";
  import { title, version, description, api_ws } from "../constants.mjs";
  const protocols = ["access_token", session.access_token];

  let uptime = websocketStore(api_ws + "/state/uptime", -1, protocols);
  let memory = websocketStore(api_ws + "/state/memory", {}, protocols);

  let server = {};

  $: {
    server.uptime = $uptime;
    server.memory = $memory;
  }
</script>

<About>
  <ApplicationDetails name={title} {version} {description} />
  <ServerDetails {server} />
  <SessionDetails session={$session} />
  <ServiceWorkerDetails serviceWorker={$serviceWorker}  />
  <ServiceWorkerRegistrationDetails serviceWorkerRegistration={$serviceWorkerRegistration} />
</About>
