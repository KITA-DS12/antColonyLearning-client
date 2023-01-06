<template>
  <img id="logo" src="@/assets/aclearning.png" alt="">
  <div class="space" />
  <GraphSpace />
</template>

<script>
import GraphSpace from '@/components/GraphSpace'

export default {
  components: {
    GraphSpace,
  },
  data: () => ({
  }),
}
</script>

<style>
#logo {
  padding: 20px;
  width: 30%;
}
.space {
  height: 3vh;
}
</style>
