"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Building2, Mail, Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const route = useRouter();

  const phone = "5588993519431";
  const message =
    "Olá! Tenho interesse em conversar sobre os imóveis disponíveis e entender melhor as opções que atendem ao meu perfil. Poderia me auxiliar?";

  return (
    <header className="top-0 left-0 right-0 z-50 bg-white fixed shadow">
      <div className="container mx-auto px-4 py-3 max-w-310">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src={"/logo-marquez.jpeg"}
                width={40}
                height={40}
                quality={100}
                alt="Logo Marquez"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-primary font-semibold text-lg leading-tight">
                Casa e Turismo Marquez
              </span>
              <span className="text-muted-foreground text-xs">
                O símbolo de Canoa no seu imóvel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 ">
            <Button
              variant={pathname === "/inicio" ? "default" : "ghost"}
              className={clsx(
                "text-foreground gap-2",
                pathname === "/inicio" &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
              onClick={() => route.push("/inicio")}
            >
              <Home className="w-4 h-4" />
              Início
            </Button>
            <Button
              variant={pathname === "/imoveis" ? "default" : "ghost"}
              className={clsx(
                "text-foreground gap-2",
                pathname === "/imoveis" &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
              onClick={() => route.push("/imoveis")}
            >
              <Building2 className="w-4 h-4" />
              Imóveis
            </Button>
            <Button
              variant={pathname === "/contato" ? "default" : "ghost"}
              className={clsx(
                "text-foreground gap-2",
                pathname === "/contato" &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
              onClick={() => route.push("/contato")}
            >
              <Mail className="w-4 h-4" />
              Contato
            </Button>
            <Button
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              onClick={() => {
                const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                window.open(url, "_blank");
              }}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Chamar no WhatsApp
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-out
            ${
              mobileMenuOpen
                ? "max-h-96 opacity-100 translate-y-0 mt-4"
                : "max-h-0 opacity-0 -translate-y-4"
            }
             flex flex-col gap-2
          `}
        >
          <Button
            variant={pathname === "/inicio" ? "default" : "ghost"}
            className={clsx(
              "gap-2 justify-start",
              pathname === "/inicio" &&
                "bg-primary text-primary-foreground gap-2 justify-start",
            )}
            onClick={() => route.push("/inicio")}
          >
            <Home className="w-4 h-4" />
            Início
          </Button>

          <Button
            variant={pathname === "/imoveis" ? "default" : "ghost"}
            className={clsx(
              "gap-2 justify-start",
              pathname === "/imoveis" &&
                "bg-primary text-primary-foreground gap-2 justify-start",
            )}
            onClick={() => route.push("/imoveis")}
          >
            <Building2 className="w-4 h-4" />
            Imóveis
          </Button>

          <Button
            variant={pathname === "/contato" ? "default" : "ghost"}
            className={clsx(
              "gap-2 justify-start",
              pathname === "/contato" &&
                "bg-primary text-primary-foreground gap-2 justify-start",
            )}
            onClick={() => route.push("/contato")}
          >
            <Mail className="w-4 h-4" />
            Contato
          </Button>
          <Button
            className="flex-1 bg-green-500 hover:bg-green-600 text-white h-12"
            onClick={() => {
              const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
              window.open(url, "_blank");
            }}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Chamar no WhatsApp
          </Button>
        </nav>
      </div>
    </header>
  );
}
