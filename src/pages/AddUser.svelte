<script>
  import api from "consts:api";
  export let router;

  const route = router.route;
  const user = $route.value;

  let username = "";
  let password = "";

  let active = false;
  let message;

  async function submit() {
    try {
      active = true;

      const response = await fetch(`${api}/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: username,
          password
        })
      });

      if (!response.ok) {
        message = response.statusText;
      }
    } catch (e) {
      message = e;
    } finally {
      active = false;
      password = "";
    }
  }
</script>

<form on:submit|preventDefault={submit}>
  {#if message}
    <slot name="message">
      <div class="error" id="message">{message}</div>
    </slot>
  {/if}

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
  <label for="current-password">
    Password
    <input
      aria-label="current password"
      aria-required="true"
      size="32"
      autocorrect="off"
      autocapitalize="off"
      autocomplete="current-password"
      id="new-password"
      type="password"
      placeholder="Current Password"
      name="password"
      required
      disabled={active}
      bind:value={password} />
  </label>

  <button id="submit" type="submit" disabled={!password || !username}>
    Add User
    {#if active}
      <div class="spinner" />
    {/if}
  </button>
</form>
