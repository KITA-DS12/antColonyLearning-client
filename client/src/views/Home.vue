<template>
  <img id="logo" src="@/assets/aclearning.png" alt="">
  <GraphSpace />
</template>

<script>
import GraphSpace from '@/components/GraphSpace'

export default {
  components: {
    GraphSpace,
  },
}
</script>

<style>
  #logo {
    padding: 20px;
    width: 30%;
  }
</style>
