import { Header } from "@/components/header";
import { HomeFooter } from "@/components/home-footer";

export default function PublicLayout({
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
