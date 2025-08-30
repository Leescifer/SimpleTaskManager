import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import KanbanBoard from '@/components/kanban'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Kanban Board</h1>
      <KanbanBoard />
    </main>
  );
}
