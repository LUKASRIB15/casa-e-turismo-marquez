"use client";

import { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Car,
  Maximize,
  Phone,
  MessageCircle,
  Loader2,
} from "lucide-react";
import type { Property } from "../page";

const typeColors = {
  Venda: "bg-green-500 hover:bg-green-500",
  Temporada: "bg-orange-500 hover:bg-orange-500",
  Aluguel: "bg-blue-500 hover:bg-blue-500",
};

export default function PropertyDetailPage() {
  const params = useParams() as { id: string };
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, startLoading] = useTransition();

  useEffect(() => {
    async function getProperty(id: string) {
      startLoading(async () => {
        const res = await fetch(`/api/properties/${id}`, {
          method: "GET",
        });

        const result = await res.json();

        setProperty(result.property);
      });
    }

    getProperty(params.id);
  }, []);

  if (!property && !isLoading) {
    return (
      <main className="min-h-screen bg-[#fdf5f0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">
            Imóvel não encontrado
          </h1>
          <Button onClick={() => router.push("/imoveis")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para imóveis
          </Button>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-24 px-4 h-screen bg-[#fdf5f0]">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-6">
          <Loader2 className="w-8 h-8 text-slate-400 animate-spin mb-4" />
        </div>

        <p className="text-slate-500 text-sm">
          Carregando informações do imóvel...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdf5f0] pt-14">
      <div className="container mx-auto px-4 py-8 max-w-310 m-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={`https://wcuzdbjbfqvtwxmxrmya.supabase.co/storage/v1/object/public/properties_images/${JSON.parse(property!.images)[selectedImage]}`}
                alt={property!.title}
                fill
                className="object-cover"
              />
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/90 hover:bg-white rounded-lg h-10 w-10"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart
                    className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-400"}`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/90 hover:bg-white rounded-lg h-10 w-10"
                >
                  <Share2 className="h-5 w-5 text-slate-400" />
                </Button> */}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-4">
              {JSON.parse(property!.images).map(
                (img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-24 h-24 md:w-32 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-blue-500 ring-2 ring-blue-500/20"
                        : "border-transparent hover:border-slate-300"
                    }`}
                  >
                    <Image
                      src={`https://wcuzdbjbfqvtwxmxrmya.supabase.co/storage/v1/object/public/properties_images/${img}`}
                      alt={`${property!.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex items-center gap-3">
              <Badge className={`${typeColors[property!.status]} text-white`}>
                {property!.status}
              </Badge>
              <Badge
                variant="outline"
                className="border-slate-300 text-slate-600"
              >
                {property!.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              {property!.title}
            </h1>

            {/* Location */}
            <div className="flex items-center text-slate-500">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              <span>{property!.locale}</span>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold text-blue-600">
              {new Intl.NumberFormat("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                style: "currency",
                currency: "BRL",
              }).format(property!.price / 100)}
            </p>

            {/* Characteristics Card */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-800 mb-4">
                  Características
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Bed className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Quartos</p>
                      <p className="font-semibold text-slate-800">
                        {property!.qtd_beds}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Bath className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Banheiros</p>
                      <p className="font-semibold text-slate-800">
                        {property!.qtd_bathroom}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Car className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Vagas</p>
                      <p className="font-semibold text-slate-800">
                        {property!.qtd_cars}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Maximize className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Área Total</p>
                      <p className="font-semibold text-slate-800">
                        {property!.area_size}m²
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-800 mb-3">Descrição</h3>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  // className="prose prose-slate max-w-none"
                >
                  {property!.description}
                </ReactMarkdown>
              </CardContent>
            </Card>

            {/* Features */}
            {/* <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-800 mb-4">
                  Diferenciais
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div> 
              </CardContent>
            </Card> */}

            {/* Contact Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white h-12">
                <MessageCircle className="h-5 w-5 mr-2" />
                Chamar no WhatsApp
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary hover:text-white h-12 bg-transparent"
              >
                <Phone className="h-5 w-5 mr-2" />
                Ligar Agora
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
