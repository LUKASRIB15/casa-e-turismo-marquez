import { Phone, Mail, MapPin } from "lucide-react";

export function HomeFooter() {
  const regions = [
    "Canoa Quebrada",
    "Majorlândia",
    "Quixaba",
    "Cumbe",
    "Lagoa do Mato",
  ];

  return (
    <footer className="bg-[#1a2332] text-white">
      <div className="container mx-auto px-4 py-12 max-w-310">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6 text-white"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-semibold">
                Casa e Turismo Marquez
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Especialistas em imóveis na região de Aracati e praias
              paradisíacas do Ceará.
            </p>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-orange-500" />
                <span className="text-sm">(88) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 text-orange-500" />
                <span className="text-sm">
                  contato@casaturismomarquez.com.br
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Aracati - CE</span>
              </li>
            </ul>
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
