<template>
  <div class="cont">
    <svg height="100" width="100">
      <circle cx="50" cy="50" r="30" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style scoped>
.cont {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

svg {
  position: absolute;
  z-index: -1;
}
svg circle {
  stroke: #a195ee;
  stroke-width: 10;
  stroke-dasharray: 95;
  stroke-dashoffset: 0;
  fill: none;
  animation: dash 1s linear infinite;
}

@keyframes dash {
  100% {
    stroke-dashoffset: 190;
  }
}
</style>