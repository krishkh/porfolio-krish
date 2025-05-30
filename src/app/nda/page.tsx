import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function NDAPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Non-Disclosure Agreement
          </h1>

          <p className="text-lg text-muted-foreground">
            This project is protected by a Non-Disclosure Agreement (NDA). The
            details cannot be publicly shared at this time.
          </p>

          <div className="mt-8 p-6 rounded-lg border border-border bg-card">
            <p className="text-muted-foreground">
              If you&apos;d like to learn more about this project, I&apos;d be
              happy to discuss it under the appropriate confidentiality terms.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Link
              href="/work"
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Work
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Mail size={20} />
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
