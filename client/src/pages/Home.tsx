import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import { CreditCard, Users, FileText, ArrowRight } from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      setLocation('/dashboard');
    }
  }, [isAuthenticated, setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold text-white">Plataforma de Cobrança</h1>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-white text-purple-600 hover:bg-white/90">
                Criar Conta
              </Button>
            </Link>
          </div>
        </nav>

        <div className="text-center text-white mt-20 mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Gerencie suas cobranças
            <br />
            de forma inteligente
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Controle total sobre suas cobranças, clientes e parcelamentos em uma plataforma moderna e eficiente
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-6">
              Começar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 text-white">
            <Users className="h-12 w-12 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Gestão de Clientes</h3>
            <p className="text-white/80">
              Cadastre e gerencie seus clientes com informações completas de contato e endereço
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 text-white">
            <CreditCard className="h-12 w-12 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Controle de Cobranças</h3>
            <p className="text-white/80">
              Acompanhe todas as suas cobranças, vencimentos e pagamentos em tempo real
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 text-white">
            <FileText className="h-12 w-12 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Parcelamentos</h3>
            <p className="text-white/80">
              Crie e gerencie parcelamentos de forma simples e organizada
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
