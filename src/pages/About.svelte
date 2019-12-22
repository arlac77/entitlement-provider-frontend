<script>
  import { dateFormatter, formatDuration } from "svelte-common";
  import { websocketStore } from "svelte-websocket-store";
  import { session } from "../main.mjs";
  import version from 'consts:version';
  import description from 'consts:description';
  import api from 'consts:api';
  import base from 'consts:base';
  import name from 'consts:name';

  let uptime = websocketStore("wss://mfelten.dynv6.net/services/entitlements/api/state/uptime", -1);

</script>

<div>
  <h2>{name}</h2>
  <p>{description}</p>
  <table class="bordered striped hoverable">
    <tbody>
      <tr>
        <td>Version</td>
        <td>{version}</td>
      </tr>
      <tr>
        <td>Mounted</td>
        <td>{base}</td>
      </tr>
      <tr>
        <td>API</td>
        <td>{api}</td>
      </tr>
      <tr>
        <td>Uptime</td>
        <td>{formatDuration($uptime)}</td>
      </tr>
      <tr>
        <td>Username</td>
        <td>{$session.username}</td>
      </tr>
      <tr>
        <td>Session Expiration</td>
        <td class={$session.isValid ? 'ok' : 'error'}>
          {dateFormatter.format($session.expirationDate)}
        </td>
      </tr>
      <tr>
        <td>Entitlements</td>
        <td>
          {#each [...$session.entitlements].sort() as name}
            <div>{name}</div>
          {/each}
        </td>
      </tr>
    </tbody>
  </table>
</div>
