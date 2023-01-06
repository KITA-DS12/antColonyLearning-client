<template>
  <div class="control-panel">
    <div class="left">
      <label>Node:</label>
      <br>
      <div class="button-block">
        <el-button @click="addNode">
          <el-icon> <CirclePlusFilled /> </el-icon>
        </el-button>
        <el-button @click="removeNode">
          <el-icon> <RemoveFilled /> </el-icon>
        </el-button>
      </div>
    </div>
    <div class="center">
      <label>LayOut:</label>
      <br>
      <div class="button-block">
        <el-button>
          <el-icon> <CaretRight /> </el-icon>
        </el-button>
        <el-button>
          <el-icon> <CaretBottom /> </el-icon>
        </el-button>
      </div>
    </div>
    <div class="right">
      <label>Zoom:</label>
      <div class="button-block">
        <el-slider
          v-model="layoutObject.zoomLevel"
          :min=0.1
          :max=16
          :step=0.1
        />
      </div>
    </div>
  </div>
</template>

<script>
import { UploadUserFile } from 'element-plus'
import { Nodes, Edges, Layouts, GridLayout, EventHandlers } from "v-network-graph"

export default {
  props: ['graphObject', 'selectedObject', 'layoutObject'],
  methods: {
    addNode() {
      const nodeId = this.graphObject.nextNodeIndex
      const name = `Node${this.graphObject.nextNodeIndex}`
      this.graphObject.nodes[this.graphObject.nextNodeIndex] = { name }
      this.graphObject.nextNodeIndex++
    },
    removeNode() {
      for (const nodeId of this.selectedObject.nodes) {
        delete this.graphObject.nodes[nodeId]
      }
    },
  }
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
  padding: 10px 40px;
}
</style>
