/**
 * @path src/app/contract/layout.tsx
 */
import styles from "@/app/contract.module.css";
export default function ContractsLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <div className={`${styles.contractsLayout}`}>
      {modal}
      {children}
    </div>
  );
}
