import ThreeGridItems from "@/components/grid/three-grid-items";

export const metadata = {
  description: "High-performance ecommerce store built with Next.js",
  openGraph: {
    type: "website",
  },
};

export default function Home() {
  return (
    <main>
      <ThreeGridItems />
    </main>
  );
}
