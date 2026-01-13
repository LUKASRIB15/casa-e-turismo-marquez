"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyCard } from "@/components/property-card";

const allProperties = [
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
  {
    id: 4,
    title: "Casa Moderna em Aracati Centro",
    location: "Aracati",
    price: "R$ 520.000,00",
    type: "Venda",
    typeColor: "bg-green-500",
    image: "/modern-house-with-pool-sunset.jpg",
    beds: 3,
    baths: 4,
    cars: 3,
    area: "350m²",
  },
  {
    id: 5,
    title: "Terreno na Praia de Quixaba - Frente para o Mar",
    location: "Quixaba",
    price: "R$ 320.000,00",
    type: "Venda",
    typeColor: "bg-green-500",
    image: "/beach-land-sunset-ocean-view.jpg",
    beds: 0,
    baths: 0,
    cars: 0,
    area: "600m²",
  },
  {
    id: 6,
    title: "Apartamento Mobiliado em Majorlândia",
    location: "Majorlândia",
    price: "R$ 2.500,00",
    type: "Aluguel",
    typeColor: "bg-blue-500",
    image: "/furnished-apartment-living-room-modern.jpg",
    beds: 2,
    baths: 2,
    cars: 1,
    area: "80m²",
  },
];

const locations = [
  "Todas",
  "Canoa Quebrada",
  "Aracati",
  "Quixaba",
  "Majorlândia",
];
const businessTypes = ["Todos", "Venda", "Aluguel", "Temporada"];
const categories = ["Todas", "Casa", "Apartamento", "Terreno", "Pousada"];

export default function PropertiesAvailables() {
  const [businessType, setBusinessType] = useState("Todos");
  const [location, setLocation] = useState("Todas");
  const [category, setCategory] = useState("Todas");

  const filteredProperties = useMemo(() => {
    return allProperties.filter((property) => {
      const matchesBusinessType =
        businessType === "Todos" || property.type === businessType;
      const matchesLocation =
        location === "Todas" || property.location === location;
      // Category filter (simplified for demo)
      const matchesCategory = category === "Todas" || true;
      return matchesBusinessType && matchesLocation && matchesCategory;
    });
  }, [businessType, location, category]);

  return (
    <main className="min-h-screen bg-[#fdf5f0]">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-310 mt-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Imóveis Disponíveis
          </h1>
          <p className="text-slate-500">
            {filteredProperties.length} imóveis encontrados
          </p>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-lg font-semibold text-slate-800">
                  Filtros
                  <SlidersHorizontal className="h-5 w-5 text-slate-400" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tipo de Negócio */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Tipo de Negócio
                  </label>
                  <Select value={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger className="w-full bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Localização */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Localização
                  </label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="w-full bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Categoria */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Categoria
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Properties Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map((property, index) => (
                <div
                  key={property.id}
                  className="opacity-0 animate-fade-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <PropertyCard key={property.id} property={property} />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProperties.length === 0 && (
              <div className="text-center py-16">
                <p className="text-slate-500 text-lg">
                  Nenhum imóvel encontrado com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
