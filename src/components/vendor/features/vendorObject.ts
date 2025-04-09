import ApiClient from "@/packages/apiServices/apiClient";
import { apiPaths } from "../urls";

export async function vendor_object_controller(id: string) {
  return get_vendor_from_server(id);
}

async function get_vendor_from_server(id: string) {
  const base_url = apiPaths.GET_VENDOR + "/" + id;
  try {
    const response = await ApiClient.get(base_url, "BACKEND");
    return response?.json();
  } catch (error) {
    console.error(`Failed to fetch vendor: ${(error as Error).message}`);
    return {};
  }
}
