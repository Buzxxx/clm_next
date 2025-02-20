import apiClient from "@/packages/apiService/apiClient";
import { apiPaths } from "../urls";

export type CategoryType = {
  id: number;
  name: string;
  description: string;
  options: any[];
};

export const category = [
  {
    id: 1,
    name: "User Management",
    description: "Manage user accounts and permissions",
    options: [
      { id: 1, name: "Create User" },
      { id: 2, name: "Edit User" },
      { id: 3, name: "Delete User" },
      { id: 4, name: "Reset Password" },
    ],
  },
  {
    id: 2,
    name: "Security Settings",
    description: "Configure security-related features",
    options: [
      { id: 5, name: "Enable Two-Factor Authentication" },
      { id: 6, name: "Manage API Keys" },
      { id: 7, name: "View Access Logs" },
    ],
  },
  {
    id: 3,
    name: "Billing & Payments",
    description: "Manage payment methods and invoices",
    options: [
      { id: 8, name: "Add Payment Method" },
      { id: 9, name: "Download Invoices" },
      { id: 10, name: "Setup Auto-Billing" },
    ],
  },
  {
    id: 4,
    name: "Notifications & Alerts",
    description: "Customize how you receive alerts",
    options: [
      { id: 11, name: "Enable Email Notifications" },
      { id: 12, name: "Enable SMS Alerts" },
      { id: 13, name: "Configure Webhook Events" },
    ],
  },
  {
    id: 5,
    name: "Data Management",
    description: "Import, export, and manage data",
    options: [
      { id: 14, name: "Import Data" },
      { id: 15, name: "Export Data" },
      { id: 16, name: "Data Cleanup" },
    ],
  },
  {
    id: 6,
    name: "System Logs & Reports",
    description: "View logs and generate reports",
    options: [
      { id: 17, name: "View Audit Logs" },
      { id: 18, name: "Generate Monthly Reports" },
      { id: 19, name: "Download System Logs" },
    ],
  },
];

export async function get_categories_controller() {
  const categories = await get_categories_from_server();
  return categories;
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
