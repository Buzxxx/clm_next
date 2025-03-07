import apiClient from "@/packages/apiService/apiClient";
import { apiPaths } from "../urls";

export type CategoryType = {
  id: number;
  name: string;
  description: string;
  image?: string;
  options: any[];
};

export async function get_categories_controller() {
  const categories = await get_categories_from_server();
  const returnList = Array.isArray(categories) ? categories : [];
  return returnList;
}

async function get_categories_from_server() {
  try {
    const response = await apiClient(
      apiPaths.getCategories,
      "ProdBackendServer",
      {
        method: "GET",
      }
    );
    return response;
  } catch (error: any) {
    console.error("Error getting leads:", error);
    return false;
  }
}
