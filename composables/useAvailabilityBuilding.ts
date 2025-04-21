type OptionsAvailability = Partial<{
  market_id: number[];
  sub_market_id: number[];
  class: string[];
  avl_type: string[];
  deal: string[];
  above_market_tis: string[];
  region_id: number[];
  generation: string[];
  currency: string[];
  tenancy: string[];
  building_name: string[];
  shared_truck: string[];
  loading_door: number[];
  developer_id: number[];
  owner_type: string[];
  owner_id: number[];
  sqftToM2: boolean;
  clear_height_ft: number[];
  size_sf: number[];
}>;
export const useAvailabilityBuilding = () => {
  const { fetchWithAuth } = useApi();

  return {
    async fetchAvailability(options: OptionsAvailability = {}) {
      const response = await fetchWithAuth(
        "/api/clients/building-availability",
        {
          method: "GET",
          params: options,
        }
      );
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchAvlStatistics(options: OptionsAvailability = {}) {
      const response = await fetchWithAuth(
        "/api/clients/building-availability/statistics",
        {
          method: "GET",
          params: options,
        }
      );
      return response as { data: { [k: string]: string }; success: boolean };
    },
  };
};
