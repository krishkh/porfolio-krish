"use client";

// import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

// function FeedAd() {
//   const insRef = useRef<HTMLModElement>(null);
//   const pushed = useRef(false);
//   useEffect(() => {
//     if (pushed.current || !insRef.current) return;
//     try {
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//       pushed.current = true;
//     } catch (e) {
//       console.warn("AdSense push failed:", e);
//     }
//   }, []);
//   return (
//     <div className="feed-ad-wrapper my-6 flex justify-center min-h-[100px] bg-[var(--background)]">
//       <ins
//         ref={insRef}
//         className="adsbygoogle"
//         style={{ display: "block" }}
//         data-ad-format="fluid"
//         data-ad-layout-key="-gw-3+1f-3d+2z"
//         data-ad-client="ca-pub-3832681614268728"
//         data-ad-slot="2443735749"
//       />
//     </div>
//   );
// }

const MOCK_POSTS = [
  {
    id: "1",
    author: "Krish",
    handle: "@krishkh",
    time: "2h ago",
    content:
      "Shipped a small feature today: dark mode for the portfolio. Sometimes the best UX is just not burning your eyes at 2 AM.",
    likes: 12,
    replies: 3,
  },
  {
    id: "2",
    author: "Krish",
    handle: "@krishkh",
    time: "5h ago",
    content:
      "Reading up on React Server Components. The mental model shift from 'everything can be async' to 'server by default' is growing on me.",
    likes: 28,
    replies: 7,
  },
  {
    id: "3",
    author: "Krish",
    handle: "@krishkh",
    time: "1d ago",
    content:
      "Debugging tip: when the bug makes no sense, check the data shape first. Half the time it's a typo in a key or an unexpected null.",
    likes: 45,
    replies: 11,
  },
  {
    id: "4",
    author: "Krish",
    handle: "@krishkh",
    time: "2d ago",
    content:
      "New blog idea: 'Things I wish I knew before my first production deploy.' Would you read it?",
    likes: 67,
    replies: 18,
  },
];

function FeedCard({
  author,
  handle,
  time,
  content,
  likes,
  replies,
}: (typeof MOCK_POSTS)[0]) {
  return (
    <article className="rounded-xl border border-[var(--foreground)]/10 bg-[var(--background)] p-4 md:p-5 shadow-sm transition hover:border-[var(--foreground)]/20">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-[var(--accent)]/30 flex items-center justify-center text-sm font-semibold text-[var(--foreground)]">
          {author[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[var(--foreground)] truncate">
            {author}
          </p>
          <p className="text-xs text-[var(--foreground)]/60 truncate">
            {handle} · {time}
          </p>
        </div>
      </div>
      <p className="text-[var(--foreground)]/90 text-sm md:text-base leading-relaxed mb-3">
        {content}
      </p>
      <div className="flex gap-4 text-xs text-[var(--foreground)]/60">
        <span>♥ {likes}</span>
        <span>↩ {replies}</span>
      </div>
    </article>
  );
}

export default function FeedPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 md:px-6">\
   
       
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
          Feed
        </h1>
        <p className="text-[var(--foreground)]/60 text-sm mb-8">
          Artificial feed for testing. Ad unit appears between posts.
        </p>

        <div className="space-y-4">
          {MOCK_POSTS.map((post, index) => (
            <div key={post.id}>
              <FeedCard {...post} />
              {/* {index === 1 && <FeedAd />} */}
              
              {(index === 1) && <> <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-format="fluid"
            data-ad-layout-key="-gw-3+1f-3d+2z"
            data-ad-client="ca-pub-3832681614268728"
            data-ad-slot="2443735749"></ins>
        <Script id="adsbygooglescript">
            (adsbygoogle = window.adsbygoogle || []).push({});
        </Script>
        </>
        }
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
