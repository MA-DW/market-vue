<script setup>
import { computed } from 'vue';
import { useIndustrialData } from '../composables/useIndustrialData'

const { filteredData } = useIndustrialData()

const recentProperties = computed(() => 
  filteredData.value
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6)
)
</script>

<template>
   <CRow class="mb-5">
            <h2>Recent Properties</h2>
        </CRow>
        <CRow class="mb-5">
            <CCol :md="2">
                <CCard>
                    <CCardHeader  style="text-align: center">
                        <img src="../../../assets/images/icons8-spinner-para-iphone-80.png" style="margin-bottom: 2rem;margin-top: 2rem;"/>
                    </CCardHeader>
                    <CCardBody style="    padding: 0px 11px;">
                        <CRow>
                            <CCol :md="6"  style="text-align: center; background-color: #18568a;color: white;height: 45px;align-content: center">MERIDA</CCol>
                            <CCol :md="6"  style="text-align: center; background-color: #04034e;color: white;height: 45px;align-content: center;">EAST</CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>Footer</CCardFooter>
                </CCard>
            </CCol>
            <CCol :md="2">
                <CCard>
                    <CCardHeader  style="text-align: center">
                        <img src="../../../assets/images/icons8-spinner-para-iphone-80.png" style="margin-bottom: 2rem;margin-top: 2rem;"/>
                    </CCardHeader>
                    <CCardBody style="    padding: 0px 11px;">
                        <CRow>
                            <CCol :md="6"  style="text-align: center; background-color: #18568a;color: white;height: 45px;align-content: center">JUAREZ</CCol>
                            <CCol :md="6"  style="text-align: center; background-color: #04034e;color: white;height: 45px;align-content: center;">SOUTHEAST</CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>Footer</CCardFooter>
                </CCard>
            </CCol>
            <CCol :md="2">
                <CCard>
                    <CCardHeader  style="text-align: center">
                        <img src="../../../assets/images/icons8-spinner-para-iphone-80.png" style="margin-bottom: 2rem;margin-top: 2rem;"/>
                    </CCardHeader>
                    <CCardBody style="    padding: 0px 11px;">
                        <CRow>
                            <CCol :md="6"  style="text-align: center; background-color: #18568a;color: white;height: 45px;align-content: center">SALTILLO</CCol>
                            <CCol :md="6"  style="text-align: center; background-color: #04034e;color: white;height: 45px;align-content: center;">RAMOS ARIZPE</CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>Footer</CCardFooter>
                </CCard>
            </CCol>
            <CCol :md="2">
                <CCard>
                    <CCardHeader  style="text-align: center">
                        <img src="../../../assets/images/icons8-spinner-para-iphone-80.png" style="margin-bottom: 2rem;margin-top: 2rem;"/>
                    </CCardHeader>
                    <CCardBody style="    padding: 0px 11px;">
                        <CRow>
                            <CCol :md="6"  style="text-align: center; background-color: #18568a;color: white;height: 45px;align-content: center">TIJUANA</CCol>
                            <CCol :md="6"  style="text-align: center; background-color: #04034e;color: white;height: 45px;align-content: center;">FLORIDO</CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>Footer</CCardFooter>
                </CCard>
            </CCol>
            <CCol :md="2">
                <CCard>
                    <CCardHeader  style="text-align: center">
                        <img src="../../../assets/images/icons8-spinner-para-iphone-80.png" style="margin-bottom: 2rem;margin-top: 2rem;"/>
                    </CCardHeader>
                    <CCardBody style="    padding: 0px 11px;">
                        <CRow>
                            <CCol :md="6"  style="text-align: center; background-color: #18568a;color: white;height: 45px;align-content: center">MERIDA</CCol>
                            <CCol :md="6"  style="text-align: center; background-color: #04034e;color: white;height: 45px;align-content: center;">EAST</CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>Footer</CCardFooter>
                </CCard>
            </CCol>
            <CCol :md="2">
                <CCard>
                    <CCardHeader  style="text-align: center">
                        <img src="../../../assets/images/icons8-spinner-para-iphone-80.png" style="margin-bottom: 2rem;margin-top: 2rem;"/>
                    </CCardHeader>
                    <CCardBody style="    padding: 0px 11px;">
                        <CRow>
                            <CCol :md="6"  style="text-align: center; background-color: #18568a;color: white;height: 45px;align-content: center">MERIDA</CCol>
                            <CCol :md="6"  style="text-align: center; background-color: #04034e;color: white;height: 45px;align-content: center;">EAST</CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>Footer</CCardFooter>
                </CCard>
            </CCol>
        </CRow>
</template>
