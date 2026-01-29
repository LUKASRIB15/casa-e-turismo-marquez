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
import { Loader2, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import type { Property } from "@/app/(public)/imoveis/page";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { DialogDescription } from "@radix-ui/react-dialog";

interface PropertyDeleteModalProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PropertyDeleteModal({
  property,
  open,
  onOpenChange,
}: PropertyDeleteModalProps) {
  const [isLoading, startLoading] = useTransition();

  async function handleDeleteProperty() {
    startLoading(async () => {
      const res = await fetch(`/api/properties/${property.id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!result.ok) {
        return toast.error("Não foi possível deletar este imóvel", {
          style: {
            background: "#DC2626", // red-600
            color: "#FFFFFF",
            border: "1px solid #B91C1C", // red-700
          },
        });
      }

      toast.success("imóvel cadastrado com sucesso", {
        style: {
          background: "#16A34A", // green-600
          color: "#FFFFFF",
          border: "1px solid #15803D", // green-700
        },
      });
      onOpenChange(false);
      await new Promise(() => setTimeout(() => window.location.reload(), 500));
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Remover imóvel
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Você deseja realmente deletar o imóvel &quot;{property.title}&quot; ?
        </DialogDescription>
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-transparent"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteProperty}
            className="bg-gradient-to-r from-red-500 to-red-800 hover:from-red-600 hover:to-orange-600 text-white"
          >
            {isLoading ? (
              <Loader2 className="w-8 h-8 text-slate-50 animate-spin" />
            ) : (
              "Deletar"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
