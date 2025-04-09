import ApiClient from "@/packages/apiServices/apiClient";
import { apiPaths } from "../urls";

interface Option {
  id: number;
  name: string;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  options: Option[];
}

interface SubType {
  id: number;
  name: string;
  categories: Category[];
}

export interface AppFeatureType {
  id: number;
  name: string;
  subTypes: SubType[];
}

export async function get_search_params(app_id: string) {
  const searchParams = await get_search_params_from_server(app_id);
  const returnObject =
    typeof searchParams === "object" && searchParams !== null
      ? searchParams
      : {};
  return returnObject;
}

async function get_search_params_from_server(app_id: string) {
  const baseUrl = apiPaths.APP_TYPES + "/" + app_id;
  try {
    const response = await ApiClient.get(baseUrl, "BACKEND");
    return response?.json();
  } catch (error: any) {
    console.error("Error getting leads:", error);
    return false;
  }
}
