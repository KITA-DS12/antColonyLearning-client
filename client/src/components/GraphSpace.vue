<template>
  <div class="graph-space">
    <v-network-graph :nodes="nodes">
    </v-network-graph>
  </div>
</template>

<script>
import * as vNG from "v-network-graph"
import { Nodes, Edges, Layouts, GridLayout, EventHandlers } from "v-network-graph"

export default {
  data: () => ({
    nodes: {
      node1: { name: "Node 1" },
      node2: { name: "Node 2" },
      node3: { name: "Node 3" },
      node4: { name: "Node 4" },
    }
  })
}
</script>
