import apiClient from "@/packages/apiService/apiClient";
import { apiPaths } from "../../../../urls";

export async function get_matching_overview_controller(
  userSelections: Record<string, unknown>,
  vendorIds: string[]
) {
  const data = await get_matching_overview_from_the_server({
    userSelections: userSelections,
    vendorIds: vendorIds,
  });
  return typeof data === "object" && data !== null ? data : {};
}

async function get_matching_overview_from_the_server(
  data: Record<string, unknown>
) {
  try {
    const response = await apiClient(
      apiPaths.GET_MATCHING_OVERVIEW,
      "ProdBackendServer",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    return response;
  } catch (error) {
    console.error(`Failed to fetch matching list: ${(error as Error).message}`);
    return null;
  }
}
