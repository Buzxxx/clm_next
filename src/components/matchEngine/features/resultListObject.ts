import apiClient from "@/packages/apiService/apiClient";
import { apiPaths } from "../urls";

export interface ListItemInterface {
  id: string;
  name: string;
  subname?: string;
  logo: string;
  description: string;
  location: string;
  matchPercentage: number;
  isVerified: boolean;
  estYear: number;
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
  const lists = await get_matching_list_from_the_server(selectedOptions);
  console.log("lists", lists);
  return lists;
}

async function get_matching_list_from_the_server(
  data: Record<string, unknown>
) {
  try {
    const response = await apiClient(
      apiPaths.getMatchingList,
      "ProdBackendServer",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    return response;
  } catch (error) {
    throw new Error(`Failed to create lead: ${(error as Error).message}`);
  }
}
