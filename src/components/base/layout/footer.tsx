import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-gray-300 bg-slate-900 flex flex-col gap-4 md:px-16 py-8">
      <div className="border-b border-slate-600 flex justify-between items-center py-4">
        <div>
          <Image
            src={"/contracts/images/image (2).png"}
            alt="logo"
            width={80}
            height={80}
            className="inline"
          />
          <span className="font-bold text-xl"> ABiz</span>
        </div>
        <div className="flex gap-2 items-center">
          Follow Us:
          <ul className="flex items-center gap-2">
            <li className="p-2 rounded-full bg-slate-700 hover:bg-slate-800 ">
              <Link href="/">
                <Image
                  src={"/contracts/assets/instagram.svg"}
                  alt=""
                  height={20}
                  width={20}
                />
              </Link>
            </li>
            <li className="p-2 rounded-full bg-slate-700 hover:bg-slate-800 ">
              <Link href="/">
                <Image
                  src={"/contracts/assets/linkedin.svg"}
                  alt=""
                  height={20}
                  width={20}
                />
              </Link>
            </li>
            <li className="p-2 rounded-full bg-slate-700 hover:bg-slate-800 ">
              <Link href="/">
                <Image
                  src={"/contracts/assets/twitter.svg"}
                  alt=""
                  height={20}
                  width={20}
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-b border-slate-600 py-8 ">
        <p className="text-sm text-slate-300">
          This online application and associated materials are based on
          information communicated by vendors to ABiz. They are provided as a
          source of guidance and we encourage users to conduct an independent
          assessment as the basis of any of their actions or decisions. Neither
          WorldCC nor Capgemini assumes any responsibility regarding the
          accuracy or exhaustiveness of the information or data provided or for
          the use of the tool by any user/third party.
        </p>
        <p className="mt-4 text-slate-300 text-sm">
          ABiz is the sole author and the exclusive owner of any intellectual
          property right on the tool and the report
        </p>
      </div>
      <div>
        <p className="text-slate-300 text-xs text-center">
          Copyright © 2024. ABiz
        </p>
      </div>
    </footer>
  );
};

export default Footer;
