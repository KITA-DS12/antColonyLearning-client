<template>
  <div class="control-panel">
    <div class="left">
      <label>Node:</label>
      <el-button @click="addNode">
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
    <div class="right">
      <label>Position:</label>
      <el-button>
        <el-icon>
          <Aim />
        </el-icon>
      </el-button>
      <el-button>
        <el-icon>
          <FullScreen />
        </el-icon>
      </el-button>
      <el-button>
        <el-icon>
          <ZoomIn />
        </el-icon>
      </el-button>
      <el-button>
        <el-icon>
          <ZoomOut />
        </el-icon>
      </el-button>
      <label>LayOut:</label>
      <el-button>
        <el-icon>
          <CaretRight />
        </el-icon>
      </el-button>
      <el-button>
        <el-icon>
          <CaretBottom />
        </el-icon>
      </el-button>
    </div>
  </div>
</template>

<script>
import { UploadUserFile } from 'element-plus'
import { Nodes, Edges, Layouts, GridLayout, EventHandlers } from "v-network-graph"

export default {
  props: ["graphObject"],
  methods: {
    addNode() {
      const nodeId = this.graphObject.nextNodeIndex
      const name = `Node${this.graphObject.nextNodeIndex}`
      this.graphObject.nodes[this.graphObject.nextNodeIndex] = { name }
      this.graphObject.nextNodeIndex++
    }
  }
}
</script>

<style>
label {
  font-size: 12px;
  padding-left: 20px;
  padding-right: 5px;
}

.left,
.right {
  display: inline-block;
}

.left {
  padding-right: 3vw;
}
</style>
