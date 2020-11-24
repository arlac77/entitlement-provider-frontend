<script>
  const route = router.route;
  const users = $route.value;
</script>

<ul>
  {#each users as user}
    <li>{user.name}</li>
  {/each}
</ul>
