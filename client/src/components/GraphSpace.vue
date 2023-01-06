<template>
  <div class="graph-space">
    <v-network-graph :nodes="graphObject.nodes">
    </v-network-graph>
  </div>
</template>

<script>
import * as vNG from "v-network-graph"
import { Nodes, Edges, Layouts, GridLayout, EventHandlers } from "v-network-graph"

export default {
  props: ['graphObject']
}
</script>

<style>
.graph-space {
  width: 90%;
  height: 60vh;
  border: 1px solid;
  margin: 0 auto;
}
</style>
