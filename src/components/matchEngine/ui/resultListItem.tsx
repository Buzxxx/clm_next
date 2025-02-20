import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/app/contract.module.css";
import CircularProgress from "@/components/ui/icons/circularProgressBar";
import { BadgeCheck, MapPin, ReceiptText, Info } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface ResultListItemProps {
  object: {
    id: string;
    name: string;
    subname?: string;
    logo: string;
    description: string;
    location: string;
    matchPercentage: number;
    isVerified: boolean;
    estYear: number;
    selected: boolean;
    onSelect: (id: string, selected: boolean) => void;
  };
}

const ResultListItem = ({ object }: ResultListItemProps) => {
  const {
    id = "",
    name = "Unknown Vendor",
    subname = "subname",
    logo = "/contracts/images/vendors/basware.svg",
    description = "This is a default description",
    location = "Berlin, Germany",
    matchPercentage = 0,
    isVerified = false,
    estYear = 2010,
    selected = false,
    onSelect = () => {},
  } = object;

  const router = useRouter();

  const openVendorDetails = () => {
    router.push(`/contracts/vendor/${id}`);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(id, e.target.checked);
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 rounded-2xl shadow-lg cursor-pointer relative">
      <div className="flex items-center justify-between gap-4">
        <Input
          type="checkbox"
          className="bg-transparent border border-gray-300 h-4 w-4"
          onChange={handleCheckboxChange}
          checked={selected}
        />
        <div className="flex justify-between items-stretch flex-1">
          <div
            className="flex flex-col gap-2 w-[92%]"
            onClick={openVendorDetails}
          >
            <div className="flex items-center gap-2 border-r border-slate-200 md:w-fit">
              <span className="h-12 w-12 rounded-full border border-slate-200 bg-white p-1 flex items-center justify-center">
                <Image
                  src={logo}
                  alt={`${name} logo`}
                  width={160}
                  height={160}
                  className="rounded-full w-full"
                />
              </span>
              <div>
                <h4 className={`${styles.textPrimary} font-bold`}>{name}</h4>
                {subname && <p className="text-xs text-gray-500">{subname}</p>}
                <p className={`${styles.textGray} text-xs`}>Estd. {estYear}</p>
              </div>
            </div>
            <p className={`${styles.textGray} text-xs px-2 line-clamp-2`}>
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-1 flex-1 md:w-[20%] text-center">
            <p className={`uppercase ${styles.textGray} text-xs text-center`}>
              Match %
            </p>
            <div className="flex justify-center">
              <CircularProgress
                percentage={matchPercentage}
                size={40}
                strokeWidth={3}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex rounded-lg bg-gray-400/10 md:p-4">
        <div className="flex justify-between w-full">
          <div className="flex items-center md:gap-6 gap-2 md:text-sm text-xs font-semibold">
            <div className="flex items-center gap-1">
              <MapPin className={`${styles.textGray} stroke-2`} size={20} />
              <p className={styles.textPrimary}>{location}</p>
            </div>
          </div>
          {isVerified && (
            <Badge
              variant="default"
              className="rounded-md bg-green-600 flex gap-1 py-1 max-md:text-xs"
            >
              <BadgeCheck size={16} /> Verified
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultListItem;
