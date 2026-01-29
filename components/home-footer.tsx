import { Mail, MapPin } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export function HomeFooter() {
  const regions = [
    "Canoa Quebrada",
    "Majorlândia",
    "Quixaba",
    "Lagoa do Mato",
    "Redonda",
    "Icapuí",
  ];

  return (
    <footer className="bg-[#1a2332] text-white">
      <div className="container mx-auto px-4 py-12 max-w-310">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-15 h-15 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={"/logo-marquez.jpeg"}
                  width={150}
                  height={150}
                  quality={100}
                  alt="Logo Marquez"
                />
              </div>
              <span className="text-xl font-semibold">
                Casa e Turismo Marquez
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              <span>&#8226;</span> 12 anos de experiência em hospedagem <br />{" "}
              <span>&#8226;</span> 9 anos como Superhost / Anfitrião Airbnb{" "}
              <br />
              <span>&#8226;</span> Mais de 220 avaliações no Airbnb Especialista
              em administração de aluguel por temporada
            </p>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <IconBrandWhatsapp className="w-4 h-4 text-orange-500" />
                <span className="text-sm">(88) 99351-9431</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 text-orange-500" />
                <span className="text-sm">casaseturismomarquez@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-orange-500" />
                <div className="flex flex-col">
                  <span className="text-sm">
                    Rua Travessa Tabelião João Paulo, nº 25
                  </span>
                  <span className="text-sm">CEP: 62803-258</span>
                </div>
              </li>
            </ul>
            {/* Redes sociais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Redes Sociais</h3>
              <div className="flex items-center gap-4">
                <Link
                  href={
                    "https://www.instagram.com/casaseturismomarquez?igsh=dDhwOWhzZDF3dGhs"
                  }
                  className="flex items-center gap-3 text-gray-400"
                >
                  <Image
                    src={"/instagram-icon.png"}
                    width={200}
                    height={200}
                    className="w-8 h-8"
                    alt={"Ícone do Instagram"}
                  />
                </Link>
                <Link
                  href={
                    "https://www.tiktok.com/@casaseturismomarquez?_r=1&_t=ZS-937e86XIYWC"
                  }
                  className="flex items-center gap-3 text-gray-400"
                >
                  <Image
                    src={"/tiktok-icon.png"}
                    width={200}
                    height={200}
                    className="w-8 h-8"
                    alt={"Ícone do Tiktok"}
                  />
                </Link>
                <Link
                  href={"https://www.facebook.com/share/1AL3jTG6Be/"}
                  className="flex items-center gap-3 text-gray-400"
                >
                  <Image
                    src={"/facebook-icon.png"}
                    width={200}
                    height={200}
                    className="w-8 h-8"
                    alt={"Ícone do Facebook"}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Regiões Atendidas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Regiões Atendidas</h3>
            <ul className="space-y-2">
              {regions.map((region) => (
                <li
                  key={region}
                  className="text-gray-400 text-sm flex items-center gap-2"
                >
                  <span className="text-orange-500">•</span>
                  {region}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divisor e Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-6">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Casa e Turismo Marquez. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
