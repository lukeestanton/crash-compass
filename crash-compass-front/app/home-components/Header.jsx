import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/CrashCompassTransparent.svg";

export default function Header() {
  return (
    <nav className="flex items-center justify-between px-6 py-2 bg-white shadow-md">
      <div className="flex items-center">
        <Link href="/" passHref>
          <Image
            src={Logo.src}
            width={400}
            height={100}
            alt="Crash Compass Logo"
            priority
            className="cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex gap-6">
        <Link
          href="/labor-market"
          className="text-base font-semibold text-gray-700 hover:text-[#c8bcab] transition-colors"
        >
          LABOR MARKET
        </Link>
        <Link
          href="/consumers"
          className="text-base font-semibold text-gray-700 hover:text-[#c8bcab] transition-colors"
        >
          CONSUMERS
        </Link>
        <Link
          href="/financial-conditions"
          className="text-base font-semibold text-gray-700 hover:text-[#c8bcab] transition-colors"
        >
          FINANCIAL CONDITIONS
        </Link>
        <Link
          href="/production"
          className="text-base font-semibold text-gray-700 hover:text-[#c8bcab] transition-colors"
        >
          PRODUCTION
        </Link>
      </div>
    </nav>
  );
}
