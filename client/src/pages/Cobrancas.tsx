import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Edit, Trash2, Search, LogOut, Menu } from 'lucide-react';
import { Link } from 'wouter';
import { toast } from 'sonner';
import api from '@/lib/api';
import type { PessoaCobranca, Pessoa } from '@/types/api';
import { format } from 'date-fns';

export default function Cobrancas() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cobrancas, setCobrancas] = useState<PessoaCobranca[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCobranca, setEditingCobranca] = useState<PessoaCobranca | null>(null);
  const [formData, setFormData] = useState<PessoaCobranca>({
    pessoaId: 0,
    descricao: '',
    valor: 0,
    dataVencimento: '',
    status: 'Pendente',
  });

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Pessoas', href: '/pessoas' },
    { icon: CreditCard, label: 'Cobranças', href: '/cobrancas', active: true },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [cobrancasRes, pessoasRes] = await Promise.all([
        api.get<PessoaCobranca[]>('/api/PessoaCobranca'),
        api.get<Pessoa[]>('/api/Pessoa'),
      ]);
      setCobrancas(cobrancasRes.data);
      setPessoas(pessoasRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCobranca) {
        await api.put(`/api/PessoaCobranca/${editingCobranca.id}`, formData);
        toast.success('Cobrança atualizada com sucesso!');
      } else {
        await api.post('/api/PessoaCobranca', formData);
        toast.success('Cobrança cadastrada com sucesso!');
      }

      setDialogOpen(false);
      setEditingCobranca(null);
      setFormData({
        pessoaId: 0,
        descricao: '',
        valor: 0,
        dataVencimento: '',
        status: 'Pendente',
      });
      loadData();
    } catch (error: any) {
      console.error('Erro ao salvar cobrança:', error);
      toast.error(error.response?.data?.message || 'Erro ao salvar cobrança');
    }
  };

  const handleEdit = (cobranca: PessoaCobranca) => {
    setEditingCobranca(cobranca);
    setFormData({
      ...cobranca,
      dataVencimento: cobranca.dataVencimento.split('T')[0],
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta cobrança?')) return;

    try {
      await api.delete(`/api/PessoaCobranca/${id}`);
      toast.success('Cobrança excluída com sucesso!');
      loadData();
    } catch (error) {
      console.error('Erro ao excluir cobrança:', error);
      toast.error('Erro ao excluir cobrança');
    }
  };

  const getPessoaNome = (pessoaId: number) => {
    const pessoa = pessoas.find((p) => p.id === pessoaId);
    return pessoa?.nome || 'N/A';
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      Pendente: 'outline',
      Pago: 'default',
      Vencido: 'destructive',
      Cancelado: 'secondary',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  const filteredCobrancas = cobrancas.filter(
    (c) =>
      c.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getPessoaNome(c.pessoaId).toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 ${
                    item.active ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100'
                  }`}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
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
              <h1 className="text-2xl font-bold text-slate-800">Gestão de Cobranças</h1>
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

        {/* Content */}
        <main className="p-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Cobranças Cadastradas</CardTitle>
                  <CardDescription>Gerencie todas as cobranças do sistema</CardDescription>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setEditingCobranca(null);
                        setFormData({
                          pessoaId: 0,
                          descricao: '',
                          valor: 0,
                          dataVencimento: '',
                          status: 'Pendente',
                        });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Nova Cobrança
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingCobranca ? 'Editar Cobrança' : 'Nova Cobrança'}</DialogTitle>
                      <DialogDescription>
                        Preencha os dados da cobrança
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="pessoaId">Pessoa</Label>
                          <Select
                            value={formData.pessoaId.toString()}
                            onValueChange={(value) => setFormData({ ...formData, pessoaId: parseInt(value) })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma pessoa" />
                            </SelectTrigger>
                            <SelectContent>
                              {pessoas.map((pessoa) => (
                                <SelectItem key={pessoa.id} value={pessoa.id!.toString()}>
                                  {pessoa.nome}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="descricao">Descrição</Label>
                          <Input
                            id="descricao"
                            value={formData.descricao}
                            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="valor">Valor (R$)</Label>
                          <Input
                            id="valor"
                            type="number"
                            step="0.01"
                            value={formData.valor}
                            onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dataVencimento">Data de Vencimento</Label>
                          <Input
                            id="dataVencimento"
                            type="date"
                            value={formData.dataVencimento}
                            onChange={(e) => setFormData({ ...formData, dataVencimento: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={formData.status}
                            onValueChange={(value) => setFormData({ ...formData, status: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pendente">Pendente</SelectItem>
                              <SelectItem value="Pago">Pago</SelectItem>
                              <SelectItem value="Vencido">Vencido</SelectItem>
                              <SelectItem value="Cancelado">Cancelado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">
                          {editingCobranca ? 'Atualizar' : 'Cadastrar'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por descrição ou pessoa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8">Carregando...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pessoa</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCobrancas.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                          Nenhuma cobrança encontrada
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCobrancas.map((cobranca) => (
                        <TableRow key={cobranca.id}>
                          <TableCell className="font-medium">{getPessoaNome(cobranca.pessoaId)}</TableCell>
                          <TableCell>{cobranca.descricao}</TableCell>
                          <TableCell>
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(cobranca.valor)}
                          </TableCell>
                          <TableCell>
                            {format(new Date(cobranca.dataVencimento), 'dd/MM/yyyy')}
                          </TableCell>
                          <TableCell>{getStatusBadge(cobranca.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleEdit(cobranca)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDelete(cobranca.id!)}
                                className="hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

