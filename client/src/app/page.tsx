'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Shield, Timer, Layers, MessageCircle, Rocket } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-blue-900 overflow-hidden">
        <div className="container mx-auto px-6 text-center z-10">
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            ZOHAIB ALI
          </h1>
          <p className="text-3xl md:text-5xl font-bold mb-8">The Best MERN Stack Developer</p>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            Full-Stack Wizard | Next.js 15 + MongoDB + Socket.io + Tailwind | Real-time Apps That Scale
          </p>
          <div className="flex gap-8 justify-center flex-wrap">
            <Link href="/client">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-xl px-12 py-8 rounded-full shadow-2xl shadow-purple-600/50">
                Hire Me Now <ArrowRight className="ml-4 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline" className="border-2 border-purple-500 text-xl px-12 py-8 rounded-full hover:bg-purple-600/20">
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-32 bg-gray-950">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              { title: "Password Generator Pro", desc: "Custom rules • Strength meter • Format-based • Copy-to-clipboard", icon: Shield },
              { title: "Time Logger + Eisenhower Matrix", desc: "Live Pomodoro • Urgent/Important quadrants • Real-time stats", icon: Timer },
              { title: "Life Management OS", desc: "Goals • Habits • Expenses • Streaks • Password protected (Vanilla JS)", icon: Layers },
            ].map((p, i) => (
              <Card key={i} className="bg-gray-900 border-purple-800 p-10 hover:scale-105 transition-all duration-300">
                <p.icon className="h-16 w-16 text-purple-400 mb-6" />
                <h3 className="text-3xl font-bold mb-4 text-purple-300">{p.title}</h3>
                <p className="text-gray-300 text-lg">{p.desc}</p>
                <Badge className="mt-6" variant="secondary">Live Soon</Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-20">Services & Pricing</h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              { name: "Landing Page / Portfolio", price: "$399", days: "5 days" },
              { name: "Full MERN App", price: "$799 – $1999", days: "10–21 days" },
              { name: "E-Commerce Store", price: "$1499", days: "14 days" },
            ].map((s) => (
              <Card key={s.name} className="bg-gradient-to-b from-purple-900 to-black p-10 border-purple-600">
                <h3 className="text-3xl font-bold mb-6">{s.name}</h3>
                <p className="text-5xl font-black text-purple-400 mb-4">{s.price}</p>
                <p className="text-xl mb-8">{s.days}</p>
                <Button className="w-full" size="lg">Order Now <MessageCircle className="ml-2" /></Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-16 bg-gray-950 text-center border-t border-gray-800">
        <p className="text-2xl">© 2025 ZOHAIB ALI – Building the Future, One Line at a Time</p>
      </footer>
    </div>
  );
}