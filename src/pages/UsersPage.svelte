<script>
  export let router;

  const route = router.route;
  const users = $route.value;
</script>

<ul>
  {#each users as user}
    <li>{user.cn}</li>
  {/each}
</ul>
