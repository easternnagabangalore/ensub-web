// FooterSimple.jsx
import React, { useEffect, useState } from "react";

export default function FooterSimple() {
  const [visitor, setVisitor] = useState({ count: 0, updatedAt: null, source: "init" });

  // CountAPI config (change namespace/key if you want)
  // Format: https://api.countapi.xyz/hit/{namespace}/{key}
  // Example namespace/key below — change to a unique name for your site.
  const COUNTAPI_NAMESPACE = "ensub";
  const COUNTAPI_KEY = "visitor-count";

  useEffect(() => {
    let mounted = true;

    async function hitCountAPI() {
      try {
        const res = await fetch(
          `https://api.countapi.xyz/hit/${encodeURIComponent(COUNTAPI_NAMESPACE)}/${encodeURIComponent(COUNTAPI_KEY)}`
        );
        if (!res.ok) throw new Error("CountAPI request failed");
        const data = await res.json();
        // data.value is the updated count (after increment)
        if (!mounted) return;
        setVisitor({
          count: data.value || 0,
          updatedAt: new Date().toISOString(),
          source: "countapi",
        });
      } catch (err) {
        // fallback to localStorage if CountAPI fails
        console.warn("CountAPI failed, using local fallback:", err);
        const key = "ensub_local_visitor";
        const prev = parseInt(localStorage.getItem(key) || "0", 10);
        const next = prev + 1;
        localStorage.setItem(key, String(next));
        if (!mounted) return;
        setVisitor({ count: next, updatedAt: new Date().toISOString(), source: "local" });
      }
    }

    hitCountAPI();

    return () => {
      mounted = false;
    };
  }, []); // run once on mount

  const formattedDate = visitor.updatedAt ? new Date(visitor.updatedAt).toLocaleString() : "-";
  const formattedCount = (visitor.count || 0).toLocaleString();

  return (
    <footer className="mt-20 bg-ensub-dark text-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-semibold text-lg mb-2">Eastern Nagaland Student Union Bengaluru</h3>
          <p className="text-sm text-gray-400">
            Fostering unity, culture, and academic excellence among students from Eastern Nagaland in Bengaluru.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a className="hover:underline" href="/about">About</a></li>
            <li><a className="hover:underline" href="/officials">Officials</a></li>
            <li><a className="hover:underline" href="/gallery">Gallery</a></li>
            <li><a className="hover:underline" href="/contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">About this Website</h4>
          <p className="text-sm text-gray-300">
            This website was initiated and launched under the leadership of
            <span className="font-semibold text-gray-200"> David Chang</span>, President (Term 2023-2025, 2025-2027) with development support from a full-stack developer based in Bangalore.
          </p>
        </div>
      </div>

      {/* Visitor Count Section */}
      <div className="text-center border-t border-gray-800 pt-6 pb-4">
        {/* <h4 className="font-semibold text-lg mb-2 text-gray-100">Visitor Count</h4> */}

        <p className="text-sm text-gray-400">
          Total Visitors: <span className="text-indigo-600 font-semibold">{formattedCount}</span>
        </p>

        <p className="text-sm text-gray-400 mb-4">
          Last Updated: <span className="text-indigo-600">{formattedDate}</span>{" "}
          <span className="text-xs text-gray-500 ml-2">({visitor.source})</span>
        </p>

        {/* Social icons (circle buttons like your image) */}
        <div className="flex justify-center gap-4 mb-6">
          <a href="https://www.facebook.com/easternnagalandstudentsunion?mibextid=wwXIfr&rdid=kids3Q7X9NNCSmMj&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16XrSVKTu2%2F%3Fmibextid%3DwwXIfr#" target="_blank" rel="noreferrer" className="hover:scale-125 transition transform" target="_blank" rel="noreferrer"
             className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow">
            {/* replace with your icon system (Font Awesome or SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07C1.86 17.1 5.84 21.07 10.7 21.94v-6.98H8.3v-2.89h2.4V9.41c0-2.37 1.4-3.68 3.55-3.68 1.03 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.46v1.74h2.59l-.41 2.89h-2.18v6.98C18.16 21.07 22 17.1 22 12.07z"/>
            </svg>
          </a>

          <a href="https://www.instagram.com/easternnagalandstudentsunion?igsh=NTVrcDBuemRkbnJr&utm_source=qr" target="_blank" rel="noreferrer"
             className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow">
            <svg xmlns="https://www.youtube.com/@ensub7730" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.06 1.8.24 2.22.4.55.22.95.49 1.37.9.42.42.69.82.9 1.37.16.42.34 1.05.4 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.06 1.17-.24 1.8-.4 2.22-.22.55-.49.95-.9 1.37-.42.42-.82.69-1.37.9-.42.16-1.05.34-2.22.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.06-1.8-.24-2.22-.4-.55-.22-.95-.49-1.37-.9-.42-.42-.69-.82-.9-1.37-.16-.42-.34-1.05-.4-2.22C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.06-1.17.24-1.8.4-2.22.22-.55.49-.95.9-1.37.42-.42.82-.69 1.37-.9.42-.16 1.05-.34 2.22-.4C8.42 2.21 8.8 2.2 12 2.2zm0 3.1a6.7 6.7 0 100 13.4 6.7 6.7 0 000-13.4zm0 11.05a4.35 4.35 0 110-8.7 4.35 4.35 0 010 8.7zm6.8-11.7a1.56 1.56 0 11-3.12 0 1.56 1.56 0 013.12 0z"/>
            </svg>
          </a>

          <a href="https://youtube.com" target="_blank" rel="noreferrer"
             className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-1-1.7-1.1-2.1-1.2C16.6 2.5 12 2.5 12 2.5h-.1s-4.6 0-8.5.2c-.4.1-1.3.2-2.1 1.2-.6.7-.8 2.3-.8 2.3S0 7.9 0 9.6v1.8c0 1.7.2 3.4.2 3.4s.2 1.6.8 2.3c.8 1 1.9 1 2.4 1.1 1.7.2 7.3.2 7.3.2s4.6 0 8.5-.2c.4-.1 1.3-.2 2.1-1.2.6-.7.8-2.3.8-2.3s.2-1.7.2-3.4v-1.8c0-1.7-.2-3.4-.2-3.4zM9.8 14.6V9.4l5.1 2.6-5.1 2.6z"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-800">
        Copyright © {new Date().getFullYear()} ENSUB. All rights reserved.
        Made with ❤️ for our community.
      </div>
    </footer>
  );
}
