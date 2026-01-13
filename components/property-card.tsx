"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bath, Bed, Car, Heart, MapPin, Maximize } from "lucide-react";

export type PropertyProps = {
  property: {
    id: number;
    title: string;
    location: string;
    price: string;
    type: string;
    typeColor: string;
    image: string;
    beds: number;
    baths: number;
    cars: number;
    area: string;
  };
};

export function PropertyCard({ property }: PropertyProps) {
  return (
    <Card
      key={property.id}
      className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white p-0 gap-0"
    >
      {/* Image Container */}
      <div className="relative h-72">
        <Image
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-110 transition duration-500"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Type Badge */}
        <Badge
          className={`absolute top-4 left-4 ${property.typeColor} text-white font-semibold hover:${property.typeColor}`}
        >
          {property.type}
        </Badge>

        {/* Favorite Button
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full h-9 w-9"
        >
          <Heart className="h-5 w-5 text-slate-400" />
        </Button> */}

        {/* Price */}
        <div className="absolute bottom-4 left-4">
          <span className="text-white text-xl md:text-2xl font-bold">
            {property.price}
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
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between text-slate-400 border-t pt-4">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span className="text-sm">{property.beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span className="text-sm">{property.baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Car className="h-4 w-4" />
            <span className="text-sm">{property.cars}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span className="text-sm">{property.area}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
