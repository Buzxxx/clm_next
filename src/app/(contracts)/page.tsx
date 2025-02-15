/**
 * @path src/app/contract/page.tsx
 */

import { Metadata } from "next";
import ContractsLayout from "@/components/contracts/layout/contractsLayout";

export const metadata: Metadata = {
  title: "Contract Lifecycle Management ",
  description: "Manage your contracts efficiently.",
};

export default function Contracts() {
  return <ContractsLayout />;
}
