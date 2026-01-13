"use client";

import { Search, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Orange Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/waves-background.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-orange-800/70 via-red-900/65 to-orange-900/70" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 text-center ">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-neutral-700/50 text-white px-5 py-2.5 rounded-full mb-8 hover:bg-neutral-800/50 transition">
          <Waves className="w-5 h-5" />
          <span className="text-sm font-medium">
            Especialistas em Imóveis de Praia
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 ">
          Seu Paraíso em
        </h1>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-orange-300/80 mb-6 ">
          Canoa Quebrada
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Descubra casas e terrenos na região mais bela do Ceará
        </p>

        <div className="bg-neutral-100 rounded-xl shadow-2xl p-6 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            {/* Tipo de negócio Select */}
            <Select>
              <SelectTrigger className="flex-1 h-12 w-full border-neutral-200 bg-white">
                <SelectValue placeholder="Tipo de negócio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comprar">Comprar</SelectItem>
                <SelectItem value="alugar">Alugar</SelectItem>
                <SelectItem value="temporada">Temporada</SelectItem>
              </SelectContent>
            </Select>

            {/* Localização Select */}
            <Select>
              <SelectTrigger className="flex-1 h-12 w-full border-neutral-200 bg-white">
                <SelectValue placeholder="Localização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="canoa-quebrada">Canoa Quebrada</SelectItem>
                <SelectItem value="aracati">Aracati</SelectItem>
                <SelectItem value="majorlandia">Majorlândia</SelectItem>
                <SelectItem value="quixaba">Quixaba</SelectItem>
              </SelectContent>
            </Select>

            {/* Search Button */}
            <Button className="h-12 px-8 bg-sky-500 hover:bg-sky-600 text-white font-medium gap-2">
              <Search className="w-4 h-4" />
              Buscar
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        {/* Onda traseira (mais escura) */}
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-32 md:h-40 animate-wave-slow"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 C150,150 350,50 500,100 C650,150 750,50 900,100 C1050,150 1200,50 1440,100 L1440,200 L0,200 Z"
            fill="rgba(154, 52, 18, 0.5)"
          />
        </svg>
        {/* Onda do meio */}
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-28 md:h-36 absolute bottom-0 animate-wave-medium"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C200,130 400,30 600,80 C800,130 1000,30 1200,80 C1350,115 1400,90 1440,100 L1440,200 L0,200 Z"
            fill="rgba(180, 83, 9, 0.55)"
          />
        </svg>
        {/* Onda da frente (mais clara, efeito de espuma) */}
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-24 md:h-32 absolute bottom-0 animate-wave-fast"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C180,80 360,140 540,100 C720,60 900,140 1080,100 C1260,60 1350,100 1440,80 L1440,200 L0,200 Z"
            fill="rgba(234, 88, 12, 0.4)"
          />
        </svg>
      </div>
    </section>
  );
}
