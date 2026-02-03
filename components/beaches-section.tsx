import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import Image from "next/image";

const beaches = [
  {
    name: "Canoa Quebrada",
    description: "A mais famosa praia do Ceará",
    image: "/canoa-quebrada-praia.jpg",
  },
  {
    name: "Majorlândia",
    description: "Tranquilidade e beleza natural",
    image: "/majorlandia-praia.png",
  },
  {
    name: "Quixaba",
    description: "Paraíso escondido",
    image: "/quixaba-praia.jpg",
  },
];

export function BeachesSection() {
  return (
    <section className="py-16 md:py-24 bg-[#fdf8f6]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 border-orange-200 bg-orange-50 text-orange-600 px-4 py-1.5"
          >
            <MapPin className="w-3.5 h-3.5 mr-1.5" />
            Localizações
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Praias Paradisíacas
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Conheça as melhores praias da região de Aracati
          </p>
        </div>

        {/* Beach Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beaches.map((beach) => (
            <Card
              key={beach.name}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white p-0 gap-0"
            >
              <CardContent className="p-0 relative">
                <div className="relative h-72 md:h-80 overflow-hidden">
                  <Image
                    src={beach.image || "/placeholder.svg"}
                    alt={beach.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                      {beach.name}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base">
                      {beach.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
