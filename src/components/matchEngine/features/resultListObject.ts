import apiClient from "@/packages/apiService/apiClient";
import { apiPaths } from "../urls";

export interface ListItemInterface {
  id: string;
  name: string;
  software_name?: string;
  logo: string;
  description: string;
  matchPercentage: number;
  is_verified: boolean;
  business_started_date: Date;
  services: string[];
  selected: boolean;
}

export const SampleListItems = [
  {
    id: "1",
    name: "Tech Solutions Inc.",
    subname: "Innovative IT Services",
    logo: "/contracts/images/vendors/basware.svg",
    description: "Providing cutting-edge technology solutions for businesses.",
    location: "New York, USA",
    matchPercentage: 85,
    isVerified: true,
    estYear: 2010,
    services: ["Cloud Computing", "Cybersecurity", "AI Solutions"],
    selected: false,
  },
  {
    id: "2",
    name: "Green Energy Co.",
    subname: "Sustainable Power Solutions",
    logo: "/contracts/images/vendors/basware.svg",
    description: "Leading provider of renewable energy solutions.",
    location: "Berlin, Germany",
    matchPercentage: 92,
    isVerified: true,
    estYear: 2015,
    services: ["Solar Energy", "Wind Energy", "Battery Storage"],
    selected: false,
  },
];

export async function get_matching_list_controller(
  selectedOptions: Record<string, unknown>
) {
  const MatchingList = await get_matching_list_from_the_server(selectedOptions);
  return Array.isArray(MatchingList) ? MatchingList : [];
}

async function get_matching_list_from_the_server(
  data: Record<string, unknown>
) {
  try {
    const response = await apiClient(
      apiPaths.GET_MATCHING_LIST,
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
