import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NoProductFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">
          No Product Found
        </h1>
        <div className="text-2xl text-gray-600 dark:text-gray-400">
          We couldn&apos;t find the product you&apos;re looking for. Try
          searching for something else.
        </div>
        <div>
          <Link href="/">
            <Button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700">
              Go back to homepage
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
