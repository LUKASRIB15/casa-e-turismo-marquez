"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Bath,
  Bed,
  Car,
  MapPin,
  Maximize,
  Pencil,
  Star,
  Trash,
} from "lucide-react";
import { Property } from "@/app/(public)/imoveis/page";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { PropertyEditModal } from "./admin/property-edit-modal";
import { useState } from "react";
import { PropertyDeleteModal } from "./admin/property-delete-modal";

export type PropertyProps = {
  property: Property;
  editMode?: boolean;
  favoriteMode?: boolean;
};

const TYPE_COLOR = {
  Venda: "bg-green-500",
  Temporada: "bg-orange-500",
  Aluguel: "bg-blue-500",
} as const;

export function PropertyCard({
  property,
  editMode = false,
  favoriteMode = false,
}: PropertyProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const images = property.images ? JSON.parse(property.images) : "";
  const route = useRouter();

  return (
    <>
      <Card
        onClick={() =>
          route.push(
            editMode
              ? `/edit/imoveis/${property.id}`
              : `/imoveis/${property.id}`,
          )
        }
        key={property.id}
        className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white p-0 gap-0"
      >
        {/* Image Container */}
        <div className="relative h-72">
          <Image
            src={`https://wcuzdbjbfqvtwxmxrmya.supabase.co/storage/v1/object/public/properties_images/${images[0]}`}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Type Badge */}
          <Badge
            className={`absolute top-4 left-4 ${TYPE_COLOR[property.status]} text-white font-semibold hover:${TYPE_COLOR[property.status]}`}
          >
            {property.status}
          </Badge>

          {/* Favorite Button */}
          {editMode && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full h-9 w-9"
                onClick={(event) => {
                  event.stopPropagation();
                  setEditModalOpen(true);
                }}
              >
                <Pencil className="h-5 w-5 text-slate-400" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-16 bg-white/90 hover:bg-white rounded-full h-9 w-9"
                onClick={(event) => {
                  event.stopPropagation();
                  setDeleteModalOpen(true);
                }}
              >
                <Trash className="h-5 w-5 text-rose-800" />
              </Button>
            </>
          )}

          {/* Price */}
          <div className="absolute bottom-4 left-4">
            <span className="text-white text-xl md:text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(property.price / 100)}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <CardContent className="p-5 z-10 bg-white">
          <h3 className="font-semibold text-slate-800 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-slate-500 mb-4">
            <MapPin className="h-4 w-4 mr-1 text-primary" />
            <span className="text-sm">{property.locale}</span>
          </div>

          {/* Features */}
          <div className="flex items-center justify-between text-slate-400 border-t pt-4">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span className="text-sm">{property.qtd_beds}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span className="text-sm">{property.qtd_bathroom}</span>
            </div>
            <div className="flex items-center gap-1">
              <Car className="h-4 w-4" />
              <span className="text-sm">{property.qtd_cars}</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span className="text-sm">{property.area_size}m²</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <PropertyEditModal
        property={property}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onSave={() => {}}
      />
      <PropertyDeleteModal
        property={property}
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
      />
    </>
  );
}
