<script setup>
import { cilPhone,cilEnvelopeClosed,cibInstagram,cibLinkedinIn,cibFacebook } from '@coreui/icons'
</script>
<template>
  <CFooter class="class-footer-customer styles-custumer-footer">
      <CCol :md="3" class="pt-4">
        <span class="letter-blue-15px">CONTACT</span>
        <br>
        <span class="letter-graylight-14px">
          MONTERREY OFFICE
          <br>
          Av. Roble 660 Edificio Cytrus - Piso 3
          <br>
          Col. Valle del Campestre
          <br>
          San Pedro Garza Garcia, N.L.
          <br>
          México. 66265          
        </span>
      </CCol>
      <CCol :md="3" class="pt-4">
        <span class="letter-graylight-14px">
          <CIcon :content="cilEnvelopeClosed" size="sm" />
          info@marketanalysis.mx
          <br>
          <CIcon :content="cilPhone" size="sm" />
          +52 81 5998 2348 
          <div class="mt-3" style="display: flex;justify-content: space-between;">
            <CIcon :content="cibLinkedinIn" size="xl" />
            <CIcon :content="cibInstagram" size="xl" />
            <CIcon :content="cibFacebook" size="xl" />
            <img src="../assets/images/icons8-twitterx-24.png"/>
          </div>

        </span>
      </CCol>
      <CCol :md="2" class="pt-4">
        <span class="letter-blue-15px">OUR SITE</span>
        <br>
        <!-- <CNav class="justify-content-center"> -->
        <CNav class="flex-column-customer">
          <CNavItem>
            <CNavLink href="#" active>About Us</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Services</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">News</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Contact</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Privacy Policy</CNavLink>
          </CNavItem>
        </CNav>
      </CCol>
      <CCol :md="4" class="pt-4">
        <span class="letter-blue-15px">SUBSCRIBE TO OUR NEWSLETTER</span>
        <CForm class="py-4 d-flex" style="padding-left: 10px;">
          <CFormInput type="email" id="exampleDropdownFormEmail1" size="sm" style="margin-right: 10px;" placeholder=""/>
          <CButton color="primary" class="letter-graylight-14px btn-cls-customer-padding" type="submit">SUBSCRIBE</CButton>
        </CForm>
      </CCol>
    <!-- <div>
      <a href="https://coreui.io" target="_blank">CoreUI</a>
      <span class="ms-1">&copy; {{ new Date().getFullYear() }} creativeLabs.</span>
    </div>
    <div class="ms-auto">
      <span class="me-1" target="_blank">Powered by</span>
      <a href="https://coreui.io/vue">CoreUI for Vue</a>
    </div> -->
  </CFooter>
</template>
