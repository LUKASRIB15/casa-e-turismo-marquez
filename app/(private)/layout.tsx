import { Header } from "@/components/admin/header";
import { HomeFooter } from "@/components/home-footer";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <HomeFooter />
    </div>
  );
}
