"use client";

import React, { useTransition } from "react";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import type { Property } from "@/app/(public)/imoveis/page";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const propertyEditModalValidationSchema = z.object({
  status: z.enum(["Venda", "Temporada", "Aluguel"]),
  price: z.string(),
  title: z.string(),
  description: z.string(),
  locale: z.enum([
    "Canoa Quebrada",
    "Majorlândia",
    "Quixaba",
    "Lagoa do Mato",
    "Redonda",
    "Icapuí",
  ]),
  qtd_bathroom: z.number(),
  qtd_beds: z.number(),
  qtd_cars: z.number(),
  area_size: z.number(),
  isFavorite: z.boolean(),
  category: z.enum(["Casa", "Apartamento", "Terreno", "Pousada"]),
});

type PropertyEditModalData = z.infer<typeof propertyEditModalValidationSchema>;

interface PropertyEditModalProps {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PropertyEditModal({
  property,
  open,
  onOpenChange,
}: PropertyEditModalProps) {
  const formatPrice = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (!numbers) return "";

    const cents = numbers.padStart(3, "0");
    const reais = cents.slice(0, -2);
    const centavos = cents.slice(-2);

    const formattedReais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${formattedReais},${centavos}`;
  };

  const [images, setImages] = useState<string[]>([]);
  const [isLoading, startLoading] = useTransition();
  const { handleSubmit, control } = useForm<PropertyEditModalData>({
    resolver: zodResolver(propertyEditModalValidationSchema),
    defaultValues: {
      qtd_bathroom: property?.qtd_bathroom ?? 0,
      qtd_beds: property?.qtd_beds ?? 0,
      qtd_cars: property?.qtd_cars ?? 0,
      area_size: property?.area_size ?? 0,
      price: property?.price ? formatPrice(String(property.price)) : "0,00",
      category: property?.category as
        | "Casa"
        | "Apartamento"
        | "Terreno"
        | "Pousada",
      title: property?.title ?? "",
      description: property?.description ?? "",
      isFavorite: property?.is_favorite ?? false,
      status: property?.status as "Venda" | "Temporada" | "Aluguel",
      locale: property?.locale as
        | "Canoa Quebrada"
        | "Majorlândia"
        | "Quixaba"
        | "Lagoa do Mato"
        | "Redonda"
        | "Icapuí",
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (property) {
      const imagesOfProperty = JSON.parse(property.images);
      const imagesWithValidURL: string[] = imagesOfProperty.map(
        (image: string) =>
          `https://wcuzdbjbfqvtwxmxrmya.supabase.co/storage/v1/object/public/properties_images/${image}`,
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImages(imagesWithValidURL);
    }
  }, [property]);

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void,
  ) => {
    const formatted = formatPrice(e.target.value);
    onChange(formatted);
  };

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImages([...images, url]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  async function blobUrlToFile(blobUrl: string, filename = "image.jpg") {
    const res = await fetch(blobUrl);
    const blob = await res.blob();

    return new File([blob], filename, { type: blob.type });
  }

  const handleSave = (data: PropertyEditModalData) => {
    if (images.length === 0) {
      return toast.error("Você precisa cadastrar imagens para o imóvel", {
        style: {
          background: "#DC2626", // red-600
          color: "#FFFFFF",
          border: "1px solid #B91C1C", // red-700
        },
      });
    }

    const {
      area_size,
      category,
      description,
      isFavorite,
      locale,
      price,
      qtd_bathroom,
      qtd_beds,
      qtd_cars,
      status,
      title,
    } = data;

    const priceToNumber = Number(price.replace(/\D/g, ""));

    startLoading(async () => {
      const imagesWithBlob = images.filter(
        (image) => image.split(":")[0] === "blob",
      );

      const imagesWithHttps = images.filter(
        (image) => image.split(":")[0] === "https",
      );

      const currentPropertyImages = JSON.parse(property!.images);

      const pathImagesToKeeping = imagesWithHttps.map((image) => {
        const imageSplitted = image.split("/");

        return imageSplitted[imageSplitted.length - 1];
      });

      const pathImagesToDeleting = currentPropertyImages.filter(
        (image: string) => !pathImagesToKeeping.includes(image),
      );

      const pathNewImages = await Promise.all(
        imagesWithBlob.map(async (imageUrl) => {
          const file = await blobUrlToFile(imageUrl);

          const pathImage = crypto.randomUUID();
          const formData = new FormData();

          formData.append("file", file);
          formData.append("path", `${pathImage}.jpg`);

          const res = await fetch("/api/upload_image", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            throw new Error("Erro ao fazer upload da imagem");
          }

          return `${pathImage}.jpg`;
        }),
      );

      const res = await fetch("/api/upload_image", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagesToDelete: pathImagesToDeleting,
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao fazer deleção das imagens no storage");
      }

      const imagesToDatabase = JSON.stringify([
        ...pathImagesToKeeping,
        ...pathNewImages,
      ]);

      const res2 = await fetch(`/api/properties/${property!.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          area_size,
          category,
          description,
          is_favorite: isFavorite,
          locale,
          price: priceToNumber,
          qtd_bathroom,
          qtd_beds,
          qtd_cars,
          status,
          title,
          images: imagesToDatabase,
        }),
      });

      const result = await res2.json();
      if (!result.ok) {
        toast.error("Não foi possível editar seu imóvel", {
          style: {
            background: "#DC2626", // red-600
            color: "#FFFFFF",
            border: "1px solid #B91C1C", // red-700
          },
        });
        return;
      }

      toast.success("imóvel editado com sucesso", {
        style: {
          background: "#16A34A", // green-600
          color: "#FFFFFF",
          border: "1px solid #15803D", // green-700
        },
      });
      onOpenChange(false);
      await new Promise(() => setTimeout(() => window.location.reload(), 500));
    });
  };

  const handleError = (error: any) => {
    const keys = Object.keys(error);

    toast.error("Ainda existe informações pendentes", {
      description: (
        <ul className="mt-2 list-disc list-inside space-y-1 text-white">
          {keys.map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      ),
      style: {
        background: "#DC2626", // red-600
        color: "#FFFFFF",
        border: "1px solid #B91C1C", // red-700
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Editar Imóvel
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Images Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-700">
              Imagens do Imóvel
            </Label>
            <div className="flex flex-wrap gap-3">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-slate-200 group"
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`Imagem ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <Trash2 className="h-6 w-6 text-white" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddImage}
                className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <Plus className="h-8 w-8 text-slate-400" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Row 1: Status, Price, Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Status
              </Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key={"Venda"} value={"Venda"}>
                        Venda
                      </SelectItem>
                      <SelectItem key={"Temporada"} value={"Temporada"}>
                        Temporada
                      </SelectItem>
                      <SelectItem key={"Aluguel"} value={"Aluguel"}>
                        Aluguel
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Preço
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  R$
                </span>
                <Controller
                  control={control}
                  name="price"
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onChange={(event) =>
                        handlePriceChange(event, field.onChange)
                      }
                      placeholder="0,00"
                      className="pl-10 bg-slate-50 border-slate-200"
                    />
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Categoria
              </Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key={"Casa"} value={"Casa"}>
                        Casa
                      </SelectItem>
                      <SelectItem key={"Apartamento"} value={"Apartamento"}>
                        Apartamento
                      </SelectItem>
                      <SelectItem key={"Terreno"} value={"Terreno"}>
                        Terreno
                      </SelectItem>
                      <SelectItem key={"Pousada"} value={"Pousada"}>
                        Pousada
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Título</Label>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Título do imóvel"
                  className="bg-slate-50 border-slate-200"
                />
              )}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">
              Descrição (suporta Markdown)
            </Label>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Descrição detalhada do imóvel..."
                  rows={4}
                  className="bg-slate-50 border-slate-200 resize-none min-h-50"
                />
              )}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">
              Localização
            </Label>
            <Controller
              control={control}
              name="locale"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="bg-slate-50 border-slate-200">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key={"Canoa Quebrada"} value={"Canoa Quebrada"}>
                      Canoa Quebrada
                    </SelectItem>
                    <SelectItem key={"Majorlândia"} value={"Majorlândia"}>
                      Majorlândia
                    </SelectItem>
                    <SelectItem key={"Quixaba"} value={"Quixaba"}>
                      Quixaba
                    </SelectItem>
                    <SelectItem key={"Lagoa do Mato"} value={"Lagoa do Mato"}>
                      Lagoa do Mato
                    </SelectItem>
                    <SelectItem key={"Redonda"} value={"Redonda"}>
                      Redonda
                    </SelectItem>
                    <SelectItem key={"Icapuí"} value={"Icapuí"}>
                      Icapuí
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Row 2: Beds, Baths, Cars, Area */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Quartos
              </Label>
              <Controller
                control={control}
                name="qtd_beds"
                render={({ field }) => (
                  <Input
                    type="number"
                    min={0}
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value) || 0)
                    }
                    className="bg-slate-50 border-slate-200"
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Banheiros
              </Label>
              <Controller
                control={control}
                name="qtd_bathroom"
                render={({ field }) => (
                  <Input
                    type="number"
                    min={0}
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value) || 0)
                    }
                    className="bg-slate-50 border-slate-200"
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Vagas
              </Label>
              <Controller
                control={control}
                name="qtd_cars"
                render={({ field }) => (
                  <Input
                    type="number"
                    min={0}
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value) || 0)
                    }
                    className="bg-slate-50 border-slate-200"
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Área (m²)
              </Label>
              <Controller
                control={control}
                name="area_size"
                render={({ field }) => (
                  <Input
                    type="number"
                    min={0}
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value) || 0)
                    }
                    className="bg-slate-50 border-slate-200"
                  />
                )}
              />
            </div>
          </div>

          {/* Highlight Switch */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-slate-700">
                Destaque
              </Label>
              <p className="text-xs text-slate-500">
                Marcar este imóvel como destaque na página inicial
              </p>
            </div>
            <Controller
              control={control}
              name="isFavorite"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit(handleSave, handleError)}
              className="bg-linear-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
            >
              {isLoading ? (
                <Loader2 className="w-8 h-8 text-slate-50 animate-spin" />
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
