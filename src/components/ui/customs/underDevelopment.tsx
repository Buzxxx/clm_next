import Link from "next/link";
import Loader from "@/components/ui/customs/loader";

export default function UnderDevelopmentPage() {
  return (
    <section className="flex flex-col items-center justify-center px-4  min-h-screen">
      <div className="mb-10">
        <Loader />
      </div>

      <h1 className="text-3xl font-bold mb-2">Under Development</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        We’re working hard to bring you something amazing. Stay tuned for
        updates, and check back soon!
      </p>
      <Link
        href="/"
        className="px-6 py-2 text-white rounded-md bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        Return Home
      </Link>
    </section>
  );
}
