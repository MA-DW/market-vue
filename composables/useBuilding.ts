export const useBuilding = () => {
  const { fetchWithAuth } = useApi();

  return {
    async fetchCategories() {
      const response = await fetchWithAuth("/api/buildings/classes", {
        method: "GET",
      });
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchGeneration() {
      const response = await fetchWithAuth("/api/buildings/generation", {
        method: "GET",
      });
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchLoadingDoor() {
      const response = await fetchWithAuth("/api/buildings/loading-doors", {
        method: "GET",
      });
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchBuildingTypes() {
      const response = await fetchWithAuth("/api/buildings/building-types", {
        method: "GET",
      });
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchTypes(
      params: { availability?: boolean; absorption?: boolean } = {}
    ) {
      const response = await fetchWithAuth("/api/buildings/types", {
        method: "GET",
        params,
      });
      return response as { data: string[]; success: boolean };
    },
    async fetchCertifications() {
      const response = await fetchWithAuth("/api/buildings/certifications", {
        method: "GET",
      });
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchOwnerTypes() {
      const response = await fetchWithAuth("/api/buildings/owner-types", {
        method: "GET",
      });
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchStages() {
      const response = await fetchWithAuth("/api/buildings/stages", {
        method: "GET",
      });
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchTypesConstruction() {
      const response = await fetchWithAuth(
        "/api/buildings/types-construction",
        {
          method: "GET",
        }
      );
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchFinalUses() {
      const response = await fetchWithAuth("/api/buildings/final-uses", {
        method: "GET",
      });
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchCompanyTypes() {
      const response = await fetchWithAuth("/api/buildings/company-types", {
        method: "GET",
      });
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchLightnings() {
      const response = await fetchWithAuth("/api/buildings/lightnings", {
        method: "GET",
      });
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchDeals() {
      const response = await fetchWithAuth("/api/buildings/deals", {
        method: "GET",
      });
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchStatus() {
      const response = await fetchWithAuth("/api/buildings/status", {
        method: "GET",
      });
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchFireProtectionSystems() {
      const response = await fetchWithAuth(
        "/api/buildings/fire-protection-systems",
        {
          method: "GET",
        }
      );
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchTenancies() {
      const response = await fetchWithAuth("/api/buildings/tenancies", {
        method: "GET",
      });
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchTechnicalImprovements() {
      const response = await fetchWithAuth(
        "/api/buildings/technical-improvements",
        {
          method: "GET",
        }
      );
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchCurrencies() {
      const response = await fetchWithAuth("/api/currencies", {
        method: "GET",
      });
      return response as { data: { [k: string]: string }; success: boolean };
    },
  };
};
