import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminForm } from "@/components/admin-form";
import Image from "next/image";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#fef6f0] flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center space-y-2">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center overflow-hidden">
              <Image
                src={"/logo-marquez.jpeg"}
                width={64}
                height={64}
                quality={100}
                alt="Logo Marquez"
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[#1e3a5f]">
            Área Administrativa
          </CardTitle>
          <CardDescription className="text-gray-500">
            Entre com suas credenciais para acessar o painel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminForm />
        </CardContent>
      </Card>
    </div>
  );
}
