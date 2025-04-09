import ApiClient from "@/packages/apiServices/apiClient";
import { apiPaths } from "../../../urls";

export async function get_appType_params() {
  const searchParams = await get_appType_params_from_server();
  const returnObject = Array.isArray(searchParams) ? searchParams : [];
  return returnObject;
}

async function get_appType_params_from_server() {
  const baseUrl = apiPaths.APP_TYPES;
  try {
    const response = await ApiClient.get(baseUrl, "BACKEND");
    return response?.json();
  } catch (error: any) {
    console.error("Error getting leads:", error);
    return false;
  }
}
