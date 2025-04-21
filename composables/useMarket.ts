type Market = {
  id: number;
  name: string;
  region_id: number;
  status: string;
};

type SubMarket = {
  id: number;
  name: string;
  region_id: number;
  status: string;
  market_id: number;
  latitude: string;
  longitude: string;
};

export const useMarket = () => {
  const { fetchWithAuth } = useApi();

  return {
    async fetchRegions() {
      const response = await fetchWithAuth("/api/regions", {
        method: "GET",
      });
      return response as {
        data: { id: number; name: string }[];
        success: boolean;
      };
    },
    async fetchMarkets(options: { region_id?: number } = {}) {
      const response = await fetchWithAuth("/api/markets", {
        method: "GET",
        params: options,
      });
      return response as { data: Market[]; success: boolean };
    },
    async fetchSubMarkets(options: { market_id?: number } = {}) {
      const response = await fetchWithAuth("/api/submarkets", {
        method: "GET",
        params: options,
      });
      return response as { data: SubMarket[]; success: boolean };
    },
    async fetchIndustrialParks() {
      const response = await fetchWithAuth("/api/industrial-parks", {
        method: "GET",
      });
      return response as {
        data: { id: number; name: string }[];
        success: boolean;
      };
    },
    async fetchDevelopers(
      params: {
        is_builder?: boolean;
        is_owner?: boolean;
        is_developer?: boolean;
      } = {}
    ) {
      const response = await fetchWithAuth("/api/developers", {
        method: "GET",
        params,
      });
      return response as {
        data: { id: number; name: string }[];
        success: boolean;
      };
    },
  };
};
