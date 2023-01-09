<template>
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
    <div class="right">
      <label>Zoom:</label>
      <div class="button-block">
        <el-slider :min=0.1 :max=12 :step=0.1 />
      </div>
    </div>
  </div>
</template>

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
