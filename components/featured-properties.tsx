"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ChevronRight, Loader2 } from "lucide-react";
import { PropertyCard } from "./property-card";
import { useEffect, useState, useTransition } from "react";
import type { Property } from "@/app/(public)/imoveis/page";
import { useRouter } from "next/navigation";

type FeaturedPropertiesProps = {
  editMode?: boolean;
};

export function FeaturedProperties({
  editMode = false,
}: FeaturedPropertiesProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, startLoading] = useTransition();
  const router = useRouter();

  useEffect(() => {
    async function fetchFavoritesProperties() {
      startLoading(async () => {
        const res = await fetch(`/api/properties/favorites`, {
          method: "GET",
        });

        const result = await res.json();

        setProperties(result.properties);
      });
    }

    fetchFavoritesProperties();
  }, []);

  return (
    <section className="bg-[#fdf5f0]">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center text-center py-24 px-4 bg-[#fdf5f0]">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-6">
            <Loader2 className="w-8 h-8 text-slate-400 animate-spin mb-4" />
          </div>
          <p className="text-slate-500 text-sm">
            Buscando imóveis em destaque...
          </p>
        </div>
      ) : (
        <div>
          {properties.length > 0 && (
            <div className="container mx-auto px-4 py-16 md:py-24 ">
              {/* Header */}
              <div className="text-center mb-12">
                <Badge className="bg-red-100 text-red-500 hover:bg-red-100 mb-4">
                  <Star className="w-3 h-3 mr-1" />
                  Destaques
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  Imóveis em Destaque
                </h2>
                <p className="text-slate-600 max-w-xl mx-auto">
                  Selecionamos os melhores imóveis para você encontrar seu novo
                  lar
                </p>
              </div>

              {/* Property Cards Grid */}
              <div className="flex flex-wrap justify-center gap-6">
                {properties &&
                  properties.map((property) => (
                    <div key={property.id} className="w-full sm:w-85 lg:w-90">
                      <PropertyCard property={property} favoriteMode />
                    </div>
                  ))}
              </div>
              <div className="py-14 flex justify-center items-center">
                <Button
                  onClick={() =>
                    router.push(editMode ? "/edit/imoveis" : "/imoveis")
                  }
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-xl py-6 hover:cursor-pointer"
                >
                  Ver todos os imóveis
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
