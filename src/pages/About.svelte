<script>
  import { onMount } from "svelte";
  import { dateFormatter } from "svelte-common";
  import { name, version, description, config } from "../../package.json";
  import { session } from "../main.mjs";

  onMount(() => {
    /*
    let url = config.api + "/ws1";
    url = url.replace(/https?:+/, "wss:");
*/

    let url = 'wss://mfelten.dynv6.net/services/entitlements/api/ws1';

//    let url = 'wss://localhost:5000/services/entitlements/api/ws1';

    const socket = new WebSocket(url);

    socket.onerror = event => {
      console.log(event);
    };

    socket.onmessage = event => {
      console.log(event.data);
    };

    socket.send("from browser");
  });
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
        <td>{config.base}</td>
      </tr>
      <tr>
        <td>API</td>
        <td>{config.api}</td>
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
