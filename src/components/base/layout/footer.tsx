import Link from "next/link";
import { Linkedin, FacebookColored } from "@/components/ui/icons";
import Image from "next/image";
import logo from "../../../../public/base/images/ABiz-Logo.gif";
import { shimmer, toBase64 } from "@/components/ui/generateBlur";

const Footer = () => {
  return (
    <footer className="text-white text-sm">
      {/* Logo Section */}
      <div className="bg-slate-50 py-6 flex justify-center">
        <Link href="/" aria-label="ABiz Home">
          <Image
            src={logo}
            alt="ABiz Logo"
            width={140}
            height={40}
            priority
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(280, 80)
            )}`}
          />
        </Link>
      </div>

      {/* Footer Info Section */}
      <div className="bg-[#004785] py-6 border-t border-black">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center space-y-3">
          {/* Social Icons */}
          <div className="flex space-x-6">
            <Link
              href="https://linkedin.com"
              aria-label="LinkedIn"
              target="_blank"
            >
              <Linkedin size={25} />
            </Link>
            <Link
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
            >
              <FacebookColored size={25} />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center">
            © 2025 ABiz |{" "}
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
