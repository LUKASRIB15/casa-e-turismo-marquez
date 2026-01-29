"use client";

import type React from "react";

import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <main className="min-h-screen bg-[#fdf5f0] mt-12">
      {/* Header Section */}
      <section className="py-16 text-center">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
          Entre em Contato
        </h1>
        <p className="text-gray-600 text-lg">
          Estamos prontos para ajudar você a encontrar o imóvel perfeito
        </p>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 pb-20">
        {/* <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto"> */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* Contact Form */}
          {/* <Card className="border border-gray-200 shadow-sm opacity-0 animate-fade-left">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#1e3a5f]">
                Envie sua Mensagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-gray-700">
                    Nome Completo
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-gray-700">
                    Telefone
                  </Label>
                  <Input
                    id="telefone"
                    placeholder="(88) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) =>
                      setFormData({ ...formData, telefone: e.target.value })
                    }
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagem" className="text-gray-700">
                    Mensagem
                  </Label>
                  <Textarea
                    id="mensagem"
                    placeholder="Como podemos ajudar você?"
                    rows={5}
                    value={formData.mensagem}
                    onChange={(e) =>
                      setFormData({ ...formData, mensagem: e.target.value })
                    }
                    className="border-gray-300 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white py-6 text-base"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card> */}

          {/* Right Column */}
          <div className="space-y-6 opacity-0 animate-fade-right w-full max-w-150">
            {/* Contact Info Card */}
            <Card className="border-0 overflow-hidden p-0">
              <div
                className="p-4 sm:p-8 text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)",
                }}
              >
                <h3 className="text-xl font-bold mb-6">
                  Informações de Contato
                </h3>

                <div className="space-y-5">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">
                        Telefone
                      </p>
                      <p className="text-white/90 text-sm sm:text-base">
                        (88) 99351-9431
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">
                        E-mail
                      </p>
                      <p className="text-white/90 text-sm sm:text-base">
                        casaseturismomarquez@gmail.com
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">
                        Endereço
                      </p>
                      <p className="text-white/90 text-sm sm:text-base">
                        Aracati - CE
                      </p>
                      <p className="text-white/90 text-sm sm:text-base">
                        Rua Travessa Tabelião João Paulo, nº 25 <br />
                        CEP: 62803-258
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Business Hours Card */}
            <Card className="border border-gray-200 shadow-sm opacity-0 animate-fade-right">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#1e3a5f]">
                  Horário de Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Segunda a Sábado</span>
                  <span className="font-medium text-gray-800">
                    9h às 12h - 14h às 21h
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Domingo</span>
                  <span className="font-medium text-red-500">Fechado</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
