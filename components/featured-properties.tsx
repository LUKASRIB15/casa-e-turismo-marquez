import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Car,
  Maximize,
  Star,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { PropertyCard } from "./property-card";

const properties = [
  {
    id: 1,
    title: "Pousada Completa em Canoa Quebrada",
    location: "Canoa Quebrada",
    price: "R$ 1.850.000,00",
    type: "Venda",
    typeColor: "bg-green-500",
    image: "/luxury-beach-pousada-with-pool-tropical.jpg",
    beds: 12,
    baths: 14,
    cars: 10,
    area: "1200m²",
  },
  {
    id: 2,
    title: "Casa de Praia em Canoa Quebrada com Vista para o Mar",
    location: "Canoa Quebrada",
    price: "R$ 850.000,00",
    type: "Venda",
    typeColor: "bg-green-500",
    image: "/modern-beach-house-with-glass-windows-ocean-view.jpg",
    beds: 4,
    baths: 3,
    cars: 2,
    area: "400m²",
  },
  {
    id: 3,
    title: "Casa de Temporada em Canoa Quebrada",
    location: "Canoa Quebrada",
    price: "R$ 800,00",
    type: "Temporada",
    typeColor: "bg-orange-500",
    image: "/luxury-vacation-house-with-pool-palm-trees.jpg",
    beds: 3,
    baths: 2,
    cars: 1,
    area: "200m²",
  },
];

export function FeaturedProperties() {
  return (
    <section className="bg-[#fdf5f0] py-16 md:py-24">
      <div className="container mx-auto px-4">
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
            Selecionamos os melhores imóveis para você encontrar seu novo lar
          </p>
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="py-14 flex justify-center items-center">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-xl py-6 hover:cursor-pointer">
            Ver todos os imóveis
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
