<template>
  <div class="file-button">
    <el-button>
      <el-icon>
        <Upload />
      </el-icon>
    </el-button>
    <el-button>
      <el-icon>
        <Download />
      </el-icon>
    </el-button>
  </div>
  <div class="graph-space">
    <div class="control-panel">
      <div class="left">
        <label>Node:</label>
        <br>
        <div class="button-block">
          <el-button @click="openDialog">
            <el-icon>
              <CirclePlusFilled />
            </el-icon>
          </el-button>
          <el-button @click="removeNode">
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

      <el-dialog v-model="nodeDialogVisible" title="New Node">
        <el-form :model="form" ref="formRef">
          <el-form-item label="Title">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="Link">
            <el-input v-model="form.link" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="addNode(formRef)">
              Add
            </el-button>
          </span>
        </template>
      </el-dialog>

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
import { onMounted, reactive, ref } from "vue"

import { Nodes, Edges, Layouts, Configs, VNetworkGraphInstance, getFullConfigs, GridLayout } from "v-network-graph"
import { FormInstance } from "element-plus"
import dagre from "dagre"

const nodes: Nodes = reactive({})
const nextNodeIndex = ref(Object.keys(nodes).length + 1)
const edges: Edges = reactive({})
const layouts: Layouts = reactive({ nodes: {} })

const selectedNodes = ref<string[]>([])
const selectedEdges = ref<string[]>([])

const configs: Configs = getFullConfigs()
configs.node.selectable = true
configs.node.normal.color = "#CC88EE"
configs.node.hover.color = "#DD66DD"
configs.node.focusring.color = "#CC66AA"
configs.view.minZoomLevel = 0.1
configs.view.maxZoomLevel = 12
configs.view.layoutHandler = new GridLayout({ grid: 10 })
const zoomLevel = ref(1)
const graph = ref<VNetworkGraphInstance>()
const nodeSize: number = 30

const nodeDialogVisible = ref(false)

interface NodeFormType {
  title: string
  link: string
}
const form: NodeFormType = reactive({
  title: "",
  link: "",
})
const formRef = ref<FormInstance>()

onMounted(() => layout("TB"))

function layout(direction: "TB" | "LR") {
  if (Object.keys(nodes).length <= 1) {
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

const openDialog = () => {
  nodeDialogVisible.value = true
}

const addNode = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const nodeId: string = `node${nextNodeIndex.value}`
  const name: string = form.title
  nodes[nodeId] = { name }
  nodes[nodeId].link = form.link
  nextNodeIndex.value++
}

const removeNode = () => {
  for (const edgeId of selectedNodes.value) {
    delete edges[edgeId]
  }
}

</script>

<style>
.file-button {
  width: 90%;
  text-align: right;
  padding: 0 0 20px 0;
  padding: 0 0 20px 0;
}

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
