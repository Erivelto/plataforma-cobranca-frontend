export interface LoginRequest {
  user: string;
  password: string;
}

export interface UserInfo {
  id: number;
  user: string;
  tipo: string;
  dataCadastro: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  refreshToken: string;
  expiresAt: string;
  user: UserInfo;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface Pessoa {
  id?: number;
  codigo?: string;
  nome: string;
  documento: string;
  dataInclusao?: string;
  dataAtualizacao?: string;
  status?: number;
  excluido?: boolean;
}

export interface PessoaCobranca {
  id?: number;
  pessoaId: number;
  descricao: string;
  valor: number;
  dataVencimento: string;
  dataPagamento?: string;
  status: string;
  observacao?: string;
  dataInclusao?: string;
  dataAtualizacao?: string;
  excluido?: boolean;
}

export interface PessoaCobrancaDetalhe {
  id?: number;
  pessoaCobrancaId: number;
  descricao: string;
  valor: number;
  quantidade: number;
  dataInclusao?: string;
  dataAtualizacao?: string;
  excluido?: boolean;
}

export interface PessoaCobrancaParcelamento {
  id?: number;
  pessoaCobrancaId: number;
  numeroParcela: number;
  valor: number;
  dataVencimento: string;
  dataPagamento?: string;
  status: string;
  dataInclusao?: string;
  dataAtualizacao?: string;
  excluido?: boolean;
}

export interface PessoaContato {
  id?: number;
  pessoaId: number;
  tipo: string;
  contato: string;
  principal: boolean;
  dataInclusao?: string;
  dataAtualizacao?: string;
  excluido?: boolean;
}

export interface PessoaEndereco {
  id?: number;
  pessoaId: number;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  principal: boolean;
  dataInclusao?: string;
  dataAtualizacao?: string;
  excluido?: boolean;
}

export interface PessoaUpload {
  id?: number;
  pessoaId: number;
  nomeArquivo: string;
  caminhoArquivo: string;
  tipoArquivo: string;
  tamanho: number;
  dataInclusao?: string;
  dataAtualizacao?: string;
  excluido?: boolean;
}

