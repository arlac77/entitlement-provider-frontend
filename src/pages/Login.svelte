<script>
  import { Login } from "svelte-session-manager";
  import { Link } from "svelte-guard-history-router";

  import { Modal } from "svelte-common";
  import { session } from "../session.mjs";
  import api from "consts:api";

  export let router;
</script>

<Modal close={() => router.abort('/')}>
  <Login
    {session}
    endpoint={api + '/authenticate'}
    result={() => router.continue('/')}>
    <div slot="footer">
      <Link href="/user/add">create account</Link>
    </div>
  </Login>
</Modal>
