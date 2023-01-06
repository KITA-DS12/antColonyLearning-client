<template>
  <img id="logo" src="@/assets/aclearning.png" alt="">
  <div class="space" />
  <ControlPanel :graphObject="graphObject" />
  <div class="space" />
  <GraphSpace :graphObject="graphObject" />
</template>

<script>
import GraphSpace from '@/components/GraphSpace'
import ControlPanel from '@/components/ControlPanel.vue'

export default {
  components: {
    GraphSpace,
    ControlPanel,
  },
  data: () => ({
    graphObject: {
      nodes: {},
      nextNodeIndex: 0,
      edges: {},
      nextEdgeIndex: 0,
    }
  })
}
</script>

<style>
#logo {
  padding: 20px;
  width: 30%;
}
.space {
  height: 5vh;
}
</style>
