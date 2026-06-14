import Link from "next/link";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import Background from "@/components/ui/Background";

export default function NDAPage() {
  return (
    <Background>
      <div className="min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="max-w-2xl w-full space-y-8 text-center">
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full border border-white/20 bg-white/5">
                <Lock size={36} className="text-white/70" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Non-Disclosure Agreement
            </h1>

            <p className="text-lg text-white/60 max-w-lg mx-auto">
              This project is protected by a Non-Disclosure Agreement. Details
              cannot be publicly shared at this time.
            </p>

            <div className="mt-8 p-6 rounded-lg border border-white/10 bg-white/5">
              <p className="text-white/50">
                If you&apos;d like to learn more about this project, reach out
                and I&apos;ll be happy to discuss it under the appropriate
                confidentiality terms.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Link
                href="/work"
                className="flex items-center gap-2 px-6 py-2 rounded-lg border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Work
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-white text-black hover:bg-white/90 transition-colors font-medium"
              >
                <Mail size={18} />
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}
