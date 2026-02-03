"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type CtaSectionProps = {
  editMode?: boolean;
};

export function CtaSection({ editMode = false }: CtaSectionProps) {
  const router = useRouter();

  const phone = "5588993519431";
  const message =
    "Olá! Tenho interesse em conversar sobre os imóveis disponíveis e entender melhor as opções que atendem ao meu perfil. Poderia me auxiliar?";

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, #dc2626, #ea580c, #f97316)",
        }}
      />

      {/* Pattern overlay with plus signs */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="plusPattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 10 L20 30 M10 20 L30 20"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#plusPattern)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
          Pronto para Encontrar Seu Imóvel dos Sonhos?
        </h2>

        <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Entre em contato conosco e deixe que nossa equipe especializada ajude
          você
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-orange-500 hover:bg-white/90 font-semibold px-8 py-6 text-base hover:cursor-pointer"
            onClick={() => {
              const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
              window.open(url, "_blank");
            }}
          >
            Falar com Corretor
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            onClick={() => router.push(editMode ? "/edit/imoveis" : "/imoveis")}
            size="lg"
            variant="outline"
            className="border-2 border-white text-white bg-transparent hover:bg-white/10 hover:text-white font-semibold px-8 py-6 text-base hover:cursor-pointer"
          >
            Ver Imóveis
          </Button>
        </div>
      </div>
    </section>
  );
}
