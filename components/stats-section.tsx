import { FileText, Users, Award, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    icon: FileText,
    value: "200+",
    label: "Imóveis Disponíveis",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: Users,
    value: "500+",
    label: "Clientes Satisfeitos",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    icon: Award,
    value: "15+",
    label: "Anos de Experiência",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Heart,
    value: "100%",
    label: "Dedicação",
    gradient: "from-green-400 to-emerald-500",
  },
];

export function StatsSection() {
  return (
    <section className="bg-gradient-to-b from-orange-50/50 to-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="border-0 shadow-none bg-transparent">
          <div className="p-0">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 ">
              {stats.map((stat, index) => (
                <Card
                  key={stat.label}
                  className={`border-0 shadow bg-neutral-100 transition-shadow duration-300 hover:shadow-xl  ${
                    index < stats.length - 1
                      ? "md:border-r md:border-gray-200 rounded-lg"
                      : ""
                  }`}
                >
                  <CardContent className="flex flex-col items-center text-center px-4 md:px-8 py-4">
                    <div
                      className={`w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <stat.icon
                        className="w-8 h-8 text-white"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                      {stat.value}
                    </span>
                    <span className="text-gray-500 text-sm md:text-base">
                      {stat.label}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
