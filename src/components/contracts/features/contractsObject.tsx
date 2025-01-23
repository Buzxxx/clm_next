/**
 * @path src/components/contracts/features/contractsObject.tsx
 */

import {
  capabilities,
  contractTypes,
  integrations,
  licensingModels,
  organizationalFunctions,
  regions,
  vendors,
} from "../noSql";

export interface SelectedOptions {
  regions: number[];
  capabilities: number[];
  organizationalFunctions: number[];
  contractTypes: number[];
  licensingModels: number[];
  integrations: number[];
}

export interface Vendor {
  breakdown?: Record<
    string,
    { percentage: number; breakdown: Record<number, boolean> }
  >;
  id: string;
  vendorName: string;
  logo: string;
  email: string;
  website: string;
  estYr: number;
  description: string;
  regions: number[];
  capabilities: number[];
  organizationalFunctions: number[];
  contractTypes: number[];
  licensingModels: number[];
  integrations: number[];
  vendorServices: string;
  vendorMatchPercentage: number;
  isVerified: boolean;
}

export interface VendorFeatures {
  capabilities: string[];
  organizationalFunctions: string[];
  contractTypes: string[];
  licensingModels: string[];
  integrations: string[];
}

export const stepInputFields = [
  {
    title: "capabilities",
    description:
      "Which of the following capabilities do you need the software to support?",
    imagePath: "/contracts/images/capability.png",
    inputType: "multiSelect" as const,
    choices: capabilities,
  },
  {
    title: "organizational functions",
    description:
      "Which of the following functions do you need the software to support?",
    imagePath: "/contracts/images/organizational_function.png",
    inputType: "multiSelect" as const,
    choices: organizationalFunctions,
  },
  {
    title: "contract types",
    description:
      "Which of the following contract types do you need the software to support?",
    imagePath: "/contracts/images/contract.webp",
    inputType: "multiSelect" as const,
    choices: contractTypes,
  },
  {
    title: "licensing models",
    description:
      "Which of the following integrations do you need the software to support?",
    imagePath: "/contracts/images/licensing.webp",
    inputType: "multiSelect" as const,
    choices: licensingModels,
  },
  {
    title: "integrations",
    description: "Do you require use of the software on specific device(s)?",
    imagePath: "/contracts/images/integrations.webp",
    inputType: "multiSelect" as const,
    choices: integrations,
  },
  {
    title: "regions",
    description: "Do you require use of the software on specific device(s)?",
    imagePath: "/contracts/images/regions.png",
    inputType: "multiSelect" as const,
    choices: regions,
  },
];

export const defaultSelectedOptions: SelectedOptions = {
  regions: [],
  capabilities: [],
  organizationalFunctions: [],
  contractTypes: [],
  licensingModels: [],
  integrations: [],
};

// Function to map step number to the correct slice of stepInputFields
export function getInputFieldsForStep(step: number) {
  return stepInputFields.slice(step * 3, (step + 1) * 3);
}

// Helper function to determine if vendor's regions cover all available regions
export const getVendorLocation = (vendorRegions: number[]): string => {
  const allRegionIds = regions.map((region) => region.id);
  const hasAllRegions = allRegionIds.every((regionId) =>
    vendorRegions.includes(regionId)
  );

  if (hasAllRegions) {
    return "Global";
  }

  // If not global, return the names of the matched regions, separated by commas
  return vendorRegions
    .map((regionId) => getDisplayName("regions", regionId))
    .join(", ");
};

export const getVendorFeatures = (vendor: Vendor) => {
  // Initialize the features object with the required structure
  const features: VendorFeatures = {
    capabilities: [],
    organizationalFunctions: [],
    contractTypes: [],
    licensingModels: [],
    integrations: [],
  };

  // Retrieve names for each category
  const getFeatureNames = (
    featureArray: { id: number; name: string }[],
    ids: number[]
  ) => {
    return featureArray
      .filter((feature) => ids.includes(feature.id))
      .map((feature) => feature.name);
  };

  // Populate the features object with the names
  features.capabilities.push(
    ...getFeatureNames(capabilities, vendor.capabilities)
  );
  features.organizationalFunctions.push(
    ...getFeatureNames(organizationalFunctions, vendor.organizationalFunctions)
  );
  features.contractTypes.push(
    ...getFeatureNames(contractTypes, vendor.contractTypes)
  );
  features.licensingModels.push(
    ...getFeatureNames(licensingModels, vendor.licensingModels)
  );
  features.integrations.push(
    ...getFeatureNames(integrations, vendor.integrations)
  );

  return features;
};

// Utility function to check if all selectedOptions are empty
export function isSelectedOptionsEmpty(selectedOptions: SelectedOptions) {
  return Object.values(selectedOptions).every(
    (options) => options.length === 0
  );
}

/**
 * Converts a given string to camelCase.
 *
 * @param str The string to convert to camelCase
 * @returns The string converted to camelCase
 */
export function toCamelCase(str: string) {
  // Split the string by spaces
  const words = str.split(" ");

  // Convert the first word to lowercase and capitalize the first letter of subsequent words
  const camelCased = words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase(); // First word is lowercase
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalize the rest
    })
    .join(""); // Join all the words together

  return camelCased;
}

/**
 * Converts a camelCase string to lowercase with spaces between words.
 * @param {string} str - The camelCase string to convert.
 * @returns {string} The converted string.
 * @example
 * camelCaseToLowercase('helloWorld') // "hello world"
 */
export function camelCaseToLowercase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert a space before each uppercase letter
    .toLowerCase(); // Convert the entire string to lowercase
}

/**
 * Calculate the percentage of selected values that match the vendor's values.
 * @param {number[]} selectedValues - The values selected by the user.
 * @param {number[]} vendorValues - The values supported by the vendor.
 * @returns {{percentage: number, breakdown: Record<number, boolean>}} - An object containing the percentage and a breakdown of which values match.
 */
export function calculateFeatureMatchPercentage(
  selectedValues: number[],
  vendorValues: number[]
): { percentage: number; breakdown: Record<number, boolean> } {
  if (!selectedValues.length || !vendorValues.length)
    return { percentage: 0, breakdown: {} };

  const breakdown: Record<number, boolean> = {};
  selectedValues.forEach((value) => {
    breakdown[value] = vendorValues.includes(value);
  });

  const matches = Object.values(breakdown).filter(Boolean).length;
  const percentage = Math.round((matches / selectedValues.length) * 100);

  return { percentage, breakdown };
}

function getPercentageBreakdown(
  selectedOptions: SelectedOptions,
  vendor: Vendor
) {
  const results: Record<
    string,
    { percentage: number; breakdown: Record<number, boolean> }
  > = {};

  const filteredSelectedOptions = filterSelectedOptions(selectedOptions);
  const keys = Object.keys(
    filteredSelectedOptions
  ) as (keyof SelectedOptions)[];

  for (const key of keys) {
    const selectedValues = filteredSelectedOptions[key];
    const vendorValues = vendor[key];

    // Ensure both selected and vendor values exist before calling calculate
    if (selectedValues.length > 0 && vendorValues.length > 0) {
      results[key] = calculateFeatureMatchPercentage(
        selectedValues,
        vendorValues
      );
    } else {
      results[key] = { percentage: 0, breakdown: {} };
    }
  }
  return results;
}

function getAveragePercentage(
  breakdown: Record<string, { percentage: number }>
): number {
  const totalPercentage = Object.values(breakdown).reduce(
    (acc, val) => acc + val.percentage,
    0
  );
  if (totalPercentage === 0) return 0;
  return totalPercentage / Object.keys(breakdown).length;
}

export function calculateVendorMatchBreakdown(
  selectedOptions: SelectedOptions,
  selectedVendors: string[]
) {
  // Filter the vendorData to only include vendors that are in the selectedVendors list
  const filteredVendors = vendors.filter((vendor) =>
    selectedVendors.includes(vendor.id)
  );

  // Calculate the match percentages for the filtered vendors only
  return filteredVendors.map((vendor) => {
    const breakdown = getPercentageBreakdown(selectedOptions, vendor);
    const averageMatchPercentage = Math.floor(getAveragePercentage(breakdown));
    vendor = { ...vendor, vendorMatchPercentage: averageMatchPercentage };
    return {
      ...vendor,
      breakdown,
    };
  });
}

export function calculateVendorAverageMatchPercentage(
  selectedOptions: SelectedOptions
) {
  return vendors
    .map((vendor) => {
      const breakdown = getPercentageBreakdown(selectedOptions, vendor);
      const averageMatchPercentage = Math.floor(
        getAveragePercentage(breakdown)
      );

      return { ...vendor, vendorMatchPercentage: averageMatchPercentage };
    })
    .sort((a, b) => b.vendorMatchPercentage - a.vendorMatchPercentage);
}

export function filterSelectedOptions(obj: SelectedOptions) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value.length > 0)
  );
}

// Helper function to map the selected item's numeric ID to its display name
export function getDisplayName(category: string, id: number): string {
  switch (category) {
    case "regions":
      return regions.find((region) => region.id === id)?.name || `Region ${id}`;
    case "capabilities":
      return (
        capabilities.find((capability) => capability.id === id)?.name ||
        `Capability ${id}`
      );
    case "organizationalFunctions":
      return (
        organizationalFunctions.find((func) => func.id === id)?.name ||
        `Function ${id}`
      );
    case "contractTypes":
      return (
        contractTypes.find((type) => type.id === id)?.name || `Contract ${id}`
      );
    case "licensingModels":
      return (
        licensingModels.find((model) => model.id === id)?.name ||
        `Licensing ${id}`
      );
    case "integrations":
      return (
        integrations.find((integration) => integration.id === id)?.name ||
        `Integration ${id}`
      );
    default:
      return `Item ${id}`;
  }
}
