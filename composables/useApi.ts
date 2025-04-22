import { useAuthStore } from "~/stores/auth";

export const useApi = () => {
  const config = useRuntimeConfig();
  const auth = useAuthStore();

  const fetchWithAuth = async (url: string, options: any = {}) => {
    options.baseURL = config.public.apiBase;
    options.headers = options.headers || {};
    options.headers["Content-Type"] = "application/json";
    options.headers["Accept"] = "application/json";

    if (auth.token) {
      options.headers.Authorization = `Bearer ${auth.token}`;
    }

    // if (options.params) {
    //   console.log(options.params);
    //   console.log(QueryString.stringify(options.params));
    //   options.params = QueryString.stringify(options.params);
    // }

    return $fetch(url, options);
  };

  return { fetchWithAuth };
};
