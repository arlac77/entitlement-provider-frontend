<script>
  import { Modal } from "svelte-common";
  import { session } from "../main.mjs";
  import api from "consts:api";

  export let router;

  let username = "";
  let newPassword = "";
  let repeatedNewPassword = "";

  let active = false;
  let message;

  async function submit() {
    try {
      active = true;
      /*message = await login(session, endpoint, username, password);
      if(!message && result !== undefined) {
        await result();
      }*/
    } catch (e) {
      message = e;
    } finally {
      active = false;
      password = "";
    }
  }
</script>

<Modal close={() => router.abort('/')}>

<form on:submit|preventDefault={submit}>
  {#if message}
    <slot name="message">
      <div class="error" id="message">{message}</div>
    </slot>
  {/if}

  <slot name="inputs">
    <label for="username">
      Username
      <input
        aria-label="username"
        aria-required="true"
        maxlength="75"
        size="32"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="username"
        id="username"
        type="text"
        placeholder="Username"
        name="username"
        required
        disabled={active}
        bind:value={username} />
    </label>
    <label for="new-password">
      New Password
      <input
        aria-label="new password"
        aria-required="true"
        size="32"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="new-password"
        id="new-password"
        type="password"
        placeholder="New Password"
        name="new-password"
        required
        disabled={active}
        bind:value={newPassword} />
    </label>
    <label for="repeated-new-password">
      Repeat New Password
      <input
        aria-label="repeated new password"
        aria-required="true"
        size="32"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="repeated-new-password"
        id="repeated-new-password"
        type="password"
        placeholder="New Password"
        name="repeated-new-password"
        required
        disabled={active}
        bind:value={repeatedNewPassword} />
    </label>
  </slot>

  <slot name="submit">
    <button id="submit" type="submit"
      disabled={!username || !newPassword || newPassword !== repeatedNewPassword}>
      Change Password
      {#if active}
        <div class="spinner" />
      {/if}
    </button>
  </slot>
</form>

</Modal>
