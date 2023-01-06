<template>
  <div class="graph-space">
    <ControlPanel
      :graphObject="graphObject"
      :selectedObject="selectedObject"
      :layoutObject="layoutObject"
    />
    <div class="draw-space">
      <v-network-graph
        v-model:selected-nodes="selectedObject.nodes"
        v-model:zoom-level="layoutObject.zoomLevel"
        :nodes="graphObject.nodes"
        :layouts="layoutObject.layouts"
        :configs="configs"
      >
      </v-network-graph>
    </div>
  </div>
</template>

<script>
import * as vNG from "v-network-graph"
import { Nodes, Edges, Layouts, GridLayout, EventHandlers } from "v-network-graph"

import ControlPanel from '@/components/ControlPanel.vue'

export default {
  components: {
    ControlPanel,
  },
  data: () => ({
    graphObject: {
      nodes: {},
      nextNodeIndex: 0,
      edges: {},
      nextEdgeIndex: 0,
    },
    selectedObject: {
      nodes: [],
      edges: [],
    },
    layoutObject: {
      layouts: {
        nodes: {},
      },
      zoomLevel: 1,
    },
    configs: vNG.getFullConfigs()
  }),
  mounted() {
    this.configs.node.selectable = true
    this.configs.node.normal.color = "#CC88EE"
    this.configs.node.hover.color = "#DD66DD"
    this.configs.node.focusring.color = "#CC66AA"
    this.configs.view.minZoomLevel = 0.1
    this.configs.view.maxZoomLevel = 16
  }
}
</script>

<style>
.graph-space {
  width: 90%;
  height: 75vh;
  border: 1px solid;
  border-radius: 30px;
  border-width: medium;
  border-color: #AA77CC;
  margin: 0 auto;
}
.draw-space {
  width: 90%;
  height: 50vh;
  border: 1px solid;
  border-radius: 30px;
  border-width: 2px;
  border-color: #AA77CC;
  margin: 3vh auto;
}
</style>
