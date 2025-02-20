import Image from "next/image";

import { shimmer, toBase64 } from "@/components/ui/generateBlur";
import logo from "../../../../public/contracts/images/logo.png";
export const ContractsLogo = () => {
  return (
    <Image
      src={logo}
      alt="logo"
      width={80}
      height={80}
      priority={true}
      placeholder="blur" // Shimmer placeholder
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(80, 80))}`}
    />
  );
};
