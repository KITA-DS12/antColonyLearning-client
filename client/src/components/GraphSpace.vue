<template>
  <div class="graph-space">
    <div class="control-panel">
      <div class="left">
        <label>Node:</label>
        <br>
        <div class="button-block">
          <el-button>
            <el-icon>
              <CirclePlusFilled />
            </el-icon>
          </el-button>
          <el-button>
            <el-icon>
              <RemoveFilled />
            </el-icon>
          </el-button>
        </div>
      </div>
      <div class="center">
        <label>LayOut:</label>
        <br>
        <div class="button-block">
          <el-button @click="graph?.panToCenter()">
            <el-icon>
              <Aim />
            </el-icon>
          </el-button>
          <el-button @click="graph?.fitToContents()">
            <el-icon>
              <FullScreen />
            </el-icon>
          </el-button>
          <el-button @click="updateLayout('LR')">
            <el-icon>
              <CaretRight />
            </el-icon>
          </el-button>
          <el-button @click="updateLayout('TB')">
            <el-icon>
              <CaretBottom />
            </el-icon>
          </el-button>
        </div>
      </div>
      <div class="right">
        <label>Zoom:</label>
        <div class="button-block">
          <el-slider v-model="zoomLevel" :min=0.1 :max=12 :step=0.1 />
        </div>
      </div>
    </div>
    <div class="draw-space">
      <v-network-graph ref="graph" v-model:zoom-level="zoomLevel" :nodes="nodes" :edges="edges" :layouts="layouts"
        :configs="configs">
      </v-network-graph>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

import { Nodes, Edges, Layouts, Configs, VNetworkGraphInstance, getFullConfigs, GridLayout } from "v-network-graph"
import dagre, { layout } from "dagre"

const nodes: Nodes = {
  node1: { name: "Node 1" },
  node2: { name: "Node 2" },
  node3: { name: "Node 3" },
  node4: { name: "Node 4" },
}
const edges: Edges = {
  edge1: { source: "node1", target: "node2" },
  edge2: { source: "node2", target: "node3" },
  edge3: { source: "node3", target: "node4" },
}
const layouts: Layouts = {
  nodes: {
    node1: { x: 0, y: 0 },
    node2: { x: 50, y: 50 },
    node3: { x: 100, y: 0 },
    node4: { x: 150, y: 50 },
  },
}
const configs: Configs = getFullConfigs()
configs.view.layoutHandler = new GridLayout({grid: 10})
const zoomLevel = ref(1)
const graph = ref<VNetworkGraphInstance>()
const nodeSize: number = 30

onMounted(() => layout("TB"))

function layout(direction: "TB" | "LR") {
      if (Object.keys(nodes).length <= 1 || Object.keys(edges).length == 0) {
        return
    }

    const g = new dagre.graphlib.Graph()
    g.setGraph({
        rankdir: direction,
        nodesep: nodeSize * 2,
        edgesep: nodeSize,
        ranksep: nodeSize * 2,
    })
    g.setDefaultEdgeLabel(() => ({}))

    Object.entries(nodes).forEach(([nodeId, node]) => {
        g.setNode(nodeId, { label: node.name, width: nodeSize, height: nodeSize })
    })

    Object.values(edges).forEach(edge => {
        g.setEdge(edge.source, edge.target)
    })

    dagre.layout(g)

    const box: Record<string, number | undefined> = {}
    g.nodes().forEach((nodeId: string) => {
        const x = g.node(nodeId).x
        const y = g.node(nodeId).y
        layouts.nodes[nodeId] = { x, y }

        box.top = box.top ? Math.min(box.top, y) : y
        box.bottom = box.bottom ? Math.max(box.bottom, y) : y
        box.left = box.left ? Math.min(box.left, x) : x
        box.right = box.right ? Math.max(box.right, x) : x
    })

    const graphMargin = nodeSize * 2
    const viewBox = {
        top: (box.top ?? 0) - graphMargin,
        bottom: (box.bottom ?? 0) + graphMargin,
        left: (box.left ?? 0) - graphMargin,
        right: (box.right ?? 0) + graphMargin,
    }
    graph.value?.setViewBox(viewBox)
}

function updateLayout(direction: "TB" | "LR") {
    graph.value?.transitionWhile(() => {
        layout(direction)
    })
}

</script>

<style>
.control-panel {
  padding: 20px 0;
}

label {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  padding-left: 20px;
  padding-right: 5px;
  padding-bottom: 20px;
}

.left,
.center,
.right {
  display: inline-block;
}

.center,
.right {
  padding-left: 30px;
}

.right {
  width: 30vw;
}

.button-block {
  border: 1px solid;
  border-radius: 50px;
  border-width: thin;
  border-color: #AA77CC;
  margin-top: 8px;
  padding: 10px 20px;
}

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
