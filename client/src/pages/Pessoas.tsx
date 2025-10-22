import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Plus, Edit, Trash2, Search, LogOut, Menu } from 'lucide-react';
import { Link } from 'wouter';
import { toast } from 'sonner';
import api from '@/lib/api';
import type { Pessoa } from '@/types/api';
import { format } from 'date-fns';

export default function Pessoas() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPessoa, setEditingPessoa] = useState<Pessoa | null>(null);
  const [formData, setFormData] = useState<Pessoa>({
    nome: '',
    documento: '',
  });

  const menuItems = [
    { icon: Users, label: 'Pessoas', href: '/pessoas', active: true },
    { label: 'Cobranças', href: '/cobrancas' },
    { label: 'Dashboard', href: '/dashboard' },
  ];

  useEffect(() => {
    loadPessoas();
  }, []);

  const loadPessoas = async () => {
    try {
      setLoading(true);
      const response = await api.get<Pessoa[]>('/api/Pessoa');
      setPessoas(response.data);
    } catch (error) {
      console.error('Erro ao carregar pessoas:', error);
      toast.error('Erro ao carregar pessoas');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPessoa) {
        await api.put(`/api/Pessoa/${editingPessoa.id}`, formData);
        toast.success('Pessoa atualizada com sucesso!');
      } else {
        await api.post('/api/Pessoa', formData);
        toast.success('Pessoa cadastrada com sucesso!');
      }

      setDialogOpen(false);
      setEditingPessoa(null);
      setFormData({ nome: '', documento: '' });
      loadPessoas();
    } catch (error: any) {
      console.error('Erro ao salvar pessoa:', error);
      toast.error(error.response?.data?.message || 'Erro ao salvar pessoa');
    }
  };

  const handleEdit = (pessoa: Pessoa) => {
    setEditingPessoa(pessoa);
    setFormData(pessoa);
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta pessoa?')) return;

    try {
      await api.delete(`/api/Pessoa/${id}`);
      toast.success('Pessoa excluída com sucesso!');
      loadPessoas();
    } catch (error) {
      console.error('Erro ao excluir pessoa:', error);
      toast.error('Erro ao excluir pessoa');
    }
  };

  const filteredPessoas = pessoas.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.documento.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h1 className="text-2xl font-bold text-slate-800">Gestão de Pessoas</h1>
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
                  <CardTitle>Pessoas Cadastradas</CardTitle>
                  <CardDescription>Gerencie todas as pessoas do sistema</CardDescription>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setEditingPessoa(null);
                        setFormData({ nome: '', documento: '' });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Nova Pessoa
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingPessoa ? 'Editar Pessoa' : 'Nova Pessoa'}</DialogTitle>
                      <DialogDescription>
                        Preencha os dados da pessoa
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="nome">Nome</Label>
                          <Input
                            id="nome"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="documento">Documento (CPF/CNPJ)</Label>
                          <Input
                            id="documento"
                            value={formData.documento}
                            onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">
                          {editingPessoa ? 'Atualizar' : 'Cadastrar'}
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
                    placeholder="Buscar por nome ou documento..."
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
                      <TableHead>Nome</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Data Cadastro</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPessoas.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                          Nenhuma pessoa encontrada
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPessoas.map((pessoa) => (
                        <TableRow key={pessoa.id}>
                          <TableCell className="font-medium">{pessoa.nome}</TableCell>
                          <TableCell>{pessoa.documento}</TableCell>
                          <TableCell>
                            {pessoa.dataInclusao
                              ? format(new Date(pessoa.dataInclusao), 'dd/MM/yyyy')
                              : '-'}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleEdit(pessoa)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDelete(pessoa.id!)}
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

