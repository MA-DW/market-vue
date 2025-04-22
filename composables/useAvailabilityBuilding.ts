export type OptionsAvailability = Partial<{
  market_id: number[];
  sub_market_id: number[];
  class: string[];
  avl_type: string[];
  deal: string[];
  size_sf: number[];
  sqftToM2: boolean;

  region_id: number[];
  generation: string[];
  currency: string[];
  tenancy: string[];
  building_name: string;
  industrial_park_id: number[];
  shared_truck: number | string;
  loading_door: string[];
  developer_id: number[];

  owner_id: number[];
  owner_type: string[];
  above_market_tis: string[];
  clear_height_ft: number[];
  latitud: string;
  longitud: string;
}>;

export function helperParamsTransformKeyToArray(params: { [k: string]: any }) {
  const newParams: { [k: string]: any } = {};
  Object.keys(params).forEach((key) => {
    if (Array.isArray(params[key])) {
      newParams[`${key}[]`] = params[key];
    } else {
      if (params[key]) {
        newParams[key] = params[key];
      } else {
        newParams[key] = undefined;
      }
    }
  });
  return newParams;
}

export const useAvailabilityBuilding = () => {
  const { fetchWithAuth } = useApi();

  return {
    async fetchAvailability(options: OptionsAvailability = {}) {
      const response = await fetchWithAuth(
        "/api/clients/building-availability",
        {
          method: "GET",
          params: helperParamsTransformKeyToArray(options),
        }
      );
      return response as { data: { [k: string]: string }; success: boolean };
    },
    async fetchAvlStatistics(options: OptionsAvailability = {}) {
      const response = await fetchWithAuth(
        "/api/clients/building-availability/statistics",
        {
          method: "GET",
          params: helperParamsTransformKeyToArray(options),
        }
      );
      return response as { data: { [k: string]: string }; success: boolean };
    },
  };
};
