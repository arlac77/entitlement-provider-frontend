<script>
  import { Login } from "svelte-session-manager";
  import { Modal } from "svelte-common";
  import { session } from "../main.mjs";
  import api from "consts:api";

  export let router;
</script>

<Modal close={() => router.abort()}>
  <h3>Change Password</h3>
</Modal>
