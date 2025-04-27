import AnimatedLoginForm from "./components/Home/Form";

import { homeMetadata } from "@/utils/Metadatas/Index";

export const metadata = homeMetadata;

export default function HomePage() {
  return (
    <main className="min-h-screen py-10 px-3 relative z-20 grid place-items-center">
      <AnimatedLoginForm />
    </main>
  );
}