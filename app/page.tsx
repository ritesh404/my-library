"use client";
import Authors from "@/components/Authors";
import Books from "@/components/Books";
import Tab from "@/components/Tab";
import Image from "next/image";
import { useState } from "react";

const tabs = [
  {
    label: "Books",
    id: "books",
  },
  {
    label: "Authors",
    id: "authors",
  },
];

export default function Home() {
  const [selectedTabId, setActiveTab] = useState("books");
  const [currentPage, setCurrentPage] = useState(1);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen px-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full h-full flex flex-col gap-8 row-start-2 sm:items-start">
        <Tab
          tabs={tabs}
          selectedTabId={selectedTabId}
          onTabChange={handleTabChange}
        />
        {selectedTabId == "books" ? (
          <Books currentPage={currentPage} />
        ) : (
          <Authors currentPage={currentPage} />
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
