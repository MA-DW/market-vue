<template>
  <div class="filter-panel">
    <div class="card">
      <div class="card-header">
        <strong>Filters</strong>
        <button class="btn btn-link float-end" @click="resetFilters">
          Reset
        </button>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label">Market</label>
          <select class="form-select" v-model="filters.market">
            <option value="">All Markets</option>
            <option v-for="option in filterOptions.markets" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Submarket</label>
          <select class="form-select" v-model="filters.submarket">
            <option value="">All Submarkets</option>
            <option v-for="option in filterOptions.submarkets" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Class</label>
          <select class="form-select" v-model="filters.class">
            <option value="">All Classes</option>
            <option v-for="option in filterOptions.classes" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Type</label>
          <select class="form-select" v-model="filters.type">
            <option value="">All Types</option>
            <option v-for="option in filterOptions.types" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Status</label>
          <select class="form-select" v-model="filters.availabilityStatus">
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Under Construction">Under Construction</option>
            <option value="Future Available">Future Available</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Size Range (SF)</label>
          <div class="input-group">
            <input 
              type="number" 
              class="form-control" 
              placeholder="Min" 
              v-model.number="filters.sizeMin"
            >
            <span class="input-group-text">-</span>
            <input 
              type="number" 
              class="form-control" 
              placeholder="Max" 
              v-model.number="filters.sizeMax"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useIndustrialData } from '../composables/useIndustrialData'

const { filters, filterOptions, resetFilters } = useIndustrialData()
</script>

<style scoped>
.filter-panel {
  padding: 1rem;
  background: white;
  border-left: 1px solid #dee2e6;
  height: 100%;
  overflow-y: auto;
}
</style>