<script setup lang="ts">
import { ref } from 'vue'

const glossaryData = ref([
  {
    title: 'Market Analysis',
    description: 'Evaluation that allows to determine the size of a particular market and identify factors such as trends, growth, customer segmentation, developers in the area, which allows to have a complete view of the market to be analyzed.'
  },
  {
    title: 'CAM',
    description: 'Cost and scope of maintenance of the common areas of a warehouse within an industrial park according to each developer/location. CAM stands for "Common Area Maintenance".'
  },
  {
    title: 'Buildings Under Construction',
    description: 'Buildings where construction has started or is still in progress and has not yet been delivered to the developer/investor/user.'
  },
  {
    title: 'Industrial Absorption',
    description: 'Industrial space that has been occupied by a user/owner, either for rent or purchase.'
  }
])
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6">Glosario</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <UikitText_Card_auto
        v-for="(item, index) in glossaryData"
        :key="index"
        :title="item.title"
        :description="item.description"
      />
    </div>
  </div>
</template> 