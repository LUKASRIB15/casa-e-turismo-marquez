"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Building2, Mail, Phone, Menu, X, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const route = useRouter();

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
                Versão para Administrador
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 ">
            <Button
              variant={pathname === "/edit/inicio" ? "default" : "ghost"}
              className={clsx(
                "text-foreground gap-2",
                pathname === "/edit/inicio" &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
              onClick={() => route.push("/edit/inicio")}
            >
              <Home className="w-4 h-4" />
              Início
            </Button>
            <Button
              variant={pathname === "/edit/imoveis" ? "default" : "ghost"}
              className={clsx(
                "text-foreground gap-2",
                pathname === "/edit/imoveis" &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
              onClick={() => route.push("/edit/imoveis")}
            >
              <Building2 className="w-4 h-4" />
              Imóveis
            </Button>
            <Button
              variant={pathname === "/edit/imoveis" ? "default" : "ghost"}
              className={
                "bg-gradient-to-r from-red-500 to-red-800 hover:from-red-600 hover:to-red-900 text-white"
              }
              onClick={async () => {
                await fetch("/api/admin/logout", {
                  method: "POST",
                });
                route.refresh();
              }}
            >
              Sair do modo Admin
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
            variant={pathname === "/edit/inicio" ? "default" : "ghost"}
            className={clsx(
              "gap-2 justify-start",
              pathname === "/edit/inicio" &&
                "bg-primary text-primary-foreground gap-2 justify-start",
            )}
            onClick={() => route.push("/edit/inicio")}
          >
            <Home className="w-4 h-4" />
            Início
          </Button>

          <Button
            variant={pathname === "/edit/imoveis" ? "default" : "ghost"}
            className={clsx(
              "gap-2 justify-start",
              pathname === "/edit/imoveis" &&
                "bg-primary text-primary-foreground gap-2 justify-start",
            )}
            onClick={() => route.push("/edit/imoveis")}
          >
            <Building2 className="w-4 h-4" />
            Imóveis
          </Button>
        </nav>
      </div>
    </header>
  );
}
