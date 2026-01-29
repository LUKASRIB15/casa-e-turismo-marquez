"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PlusCircle, SearchX, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { PropertyCreateModal } from "@/components/admin/property-create-modal";

export type Property = {
  id: string;
  images: string;
  status: "Venda" | "Temporada" | "Aluguel";
  price: number;
  title: string;
  description: string;
  locale: string;
  qtd_bathroom: number;
  qtd_beds: number;
  qtd_cars: number;
  area_size: number;
  is_favorite: boolean;
  category: string;
  updated_at: Date | null;
  created_at: Date;
};

const locations = [
  "Todas",
  "Canoa Quebrada",
  "Aracati",
  "Quixaba",
  "Majorlândia",
];

const businessTypes = ["Todos", "Venda", "Aluguel", "Temporada"];
const categories = ["Todas", "Casa", "Apartamento", "Terreno", "Pousada"];

export default function EditPropertiesAvailables() {
  const [businessType, setBusinessType] = useState("Todos");
  const [location, setLocation] = useState("Todas");
  const [category, setCategory] = useState("Todas");
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, startLoading] = useTransition();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProperties() {
      startLoading(async () => {
        const res = await fetch("/api/properties", {
          method: "GET",
        });

        const result = await res.json();
        setProperties(result.properties);
      });
    }

    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesBusinessType =
        businessType === "Todos" || property.status === businessType;
      const matchesLocation =
        location === "Todas" || property.locale === location;
      // Category filter (simplified for demo)
      const matchesCategory =
        category === "Todas" || property.category === category;
      return matchesBusinessType && matchesLocation && matchesCategory;
    });
  }, [properties, businessType, location, category]);

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
          <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-5">
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
            <Button
              onClick={() => setCreateModalOpen(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-md py-6 hover:cursor-pointer"
            >
              Adicionar novo imóvel
              <PlusCircle className="w-4 h-4" />
            </Button>
          </aside>

          {/* Properties Grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center text-center py-24 px-4 w-full">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-6">
                <Loader2 className="w-8 h-8 text-slate-400 animate-spin mb-4" />
              </div>

              <p className="text-slate-500 text-sm">
                Buscando imóveis disponíveis...
              </p>
            </div>
          ) : (
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property, index) => (
                  <div
                    key={property.id}
                    className="opacity-0 animate-fade-up"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <PropertyCard
                      key={property.id}
                      property={property}
                      editMode
                    />
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredProperties.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-24 px-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-6">
                    <SearchX className="w-8 h-8 text-slate-400" />
                  </div>

                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    Nenhum imóvel encontrado
                  </h3>

                  <p className="text-slate-500 max-w-md mb-6">
                    Não encontramos imóveis que correspondam aos filtros
                    selecionados. Tente ajustar os filtros ou remover algumas
                    restrições para ver mais opções.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <PropertyCreateModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </main>
  );
}
