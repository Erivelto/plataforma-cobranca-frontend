import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, CreditCard, Package, LogOut, Menu } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: Users, label: 'Pessoas', href: '/pessoas', color: 'text-blue-600' },
    { icon: CreditCard, label: 'Cobranças', href: '/cobrancas', color: 'text-green-600' },
    { icon: FileText, label: 'Detalhes', href: '/detalhes', color: 'text-purple-600' },
    { icon: Package, label: 'Parcelamentos', href: '/parcelamentos', color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-50 ${
          sidebarOpen ? 'w-64' : 'w-0'
        } overflow-hidden`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary mb-8">Plataforma Cobrança</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-slate-100">
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-slate-100"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-800">{user?.user}</p>
                <p className="text-xs text-slate-500">{user?.tipo}</p>
              </div>
              <Button variant="outline" size="icon" onClick={logout} className="hover:bg-red-50 hover:text-red-600">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Bem-vindo, {user?.user}!
            </h2>
            <p className="text-slate-600">
              Gerencie suas cobranças e clientes de forma eficiente
            </p>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-transparent hover:border-l-primary">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">-</div>
                    <p className="text-xs text-muted-foreground mt-1">Clique para gerenciar</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Seção de Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Acesse as funcionalidades mais utilizadas</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/pessoas">
                <Button className="w-full justify-start gap-3" variant="outline">
                  <Users className="h-5 w-5" />
                  Nova Pessoa
                </Button>
              </Link>
              <Link href="/cobrancas">
                <Button className="w-full justify-start gap-3" variant="outline">
                  <CreditCard className="h-5 w-5" />
                  Nova Cobrança
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

