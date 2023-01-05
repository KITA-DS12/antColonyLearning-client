<template>
  <img id="logo" src="@/assets/aclearning.png" alt="">
  <ControlPanel />
  <GraphSpace />
</template>

<script>
import GraphSpace from '@/components/GraphSpace'
import ControlPanel from '@/components/ControlPanel.vue'

export default {
  components: {
    GraphSpace,
    ControlPanel,
  },
}
</script>

<style>
  #logo {
    padding: 20px;
    width: 30%;
  }
</style>
