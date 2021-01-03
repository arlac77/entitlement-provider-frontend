<script>
  import { ActionButton, FetchAction } from "svelte-common";
  import api from "consts:api";
  export let router;

  const route = router.route;
  const user = $route.value;

  let username = "";
  let password = "";

  const action = new FetchAction(`${api}/user`, () => {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: username,
        password
      })
    };
  });

  let active = false;

  $: {
    active = $action.active;
  }
</script>

<form>
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

  <ActionButton
    {action}
    shortcuts="Command+A"
    disabled={!password || !username}>
    Add User
  </ActionButton>
</form>
