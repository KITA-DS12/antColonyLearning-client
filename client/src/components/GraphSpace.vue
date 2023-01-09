<template>
  <div class="graph-space">
    <ControlPanel />
    <div class="draw-space">
      <v-network-graph>
      </v-network-graph>
    </div>
  </div>
</template>

<script setup lang="ts">
import ControlPanel from '@/components/ControlPanel.vue'
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
