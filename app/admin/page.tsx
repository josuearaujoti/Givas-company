"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Download,
  Eye,
  MoreHorizontal,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Bell,
  User,
  Plus,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

// Dados mockados dos candidatos
const candidatos = [
  {
    id: 1,
    nome: "Ana Silva",
    email: "ana.silva@email.com",
    vaga: "Desenvolvedor Frontend React",
    dataAplicacao: "2024-01-15",
    status: "Aprovado",
    pontuacaoGeral: 85,
    testes: {
      tecnico: { pontuacao: 88, status: "Aprovado" },
      logica: { pontuacao: 82, status: "Aprovado" },
      comportamental: { pontuacao: 85, status: "Aprovado" },
    },
  },
  {
    id: 2,
    nome: "Carlos Santos",
    email: "carlos.santos@email.com",
    vaga: "Desenvolvedor Backend Node.js",
    dataAplicacao: "2024-01-14",
    status: "Reprovado",
    pontuacaoGeral: 65,
    testes: {
      tecnico: { pontuacao: 70, status: "Aprovado" },
      logica: { pontuacao: 55, status: "Reprovado" },
      comportamental: { pontuacao: 70, status: "Aprovado" },
    },
  },
  {
    id: 3,
    nome: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    vaga: "Designer UX/UI",
    dataAplicacao: "2024-01-13",
    status: "Em Análise",
    pontuacaoGeral: 78,
    testes: {
      tecnico: { pontuacao: 75, status: "Aprovado" },
      logica: { pontuacao: 80, status: "Aprovado" },
      comportamental: { pontuacao: 80, status: "Aprovado" },
    },
  },
  {
    id: 4,
    nome: "João Pereira",
    email: "joao.pereira@email.com",
    vaga: "Desenvolvedor Frontend React",
    dataAplicacao: "2024-01-12",
    status: "Aprovado",
    pontuacaoGeral: 92,
    testes: {
      tecnico: { pontuacao: 95, status: "Aprovado" },
      logica: { pontuacao: 90, status: "Aprovado" },
      comportamental: { pontuacao: 91, status: "Aprovado" },
    },
  },
  {
    id: 5,
    nome: "Fernanda Costa",
    email: "fernanda.costa@email.com",
    vaga: "Product Manager",
    dataAplicacao: "2024-01-11",
    status: "Em Análise",
    pontuacaoGeral: 73,
    testes: {
      tecnico: { pontuacao: 68, status: "Reprovado" },
      logica: { pontuacao: 78, status: "Aprovado" },
      comportamental: { pontuacao: 73, status: "Aprovado" },
    },
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Aprovado":
      return "bg-emerald-50 text-emerald-700 border-emerald-200"
    case "Reprovado":
      return "bg-red-50 text-red-700 border-red-200"
    case "Em Análise":
      return "bg-amber-50 text-amber-700 border-amber-200"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200"
  }
}

function CandidateDetails({ candidato }: { candidato: any }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-2">{candidato.nome}</h3>
        <p className="text-orange-100">{candidato.vaga}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Email</h4>
          <p className="text-lg text-gray-900">{candidato.email}</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Data de Aplicação</h4>
          <p className="text-lg text-gray-900">{new Date(candidato.dataAplicacao).toLocaleDateString("pt-BR")}</p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-4 text-gray-900">Pontuação Geral</h4>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Progress value={candidato.pontuacaoGeral} className="h-3" />
          </div>
          <span className="text-3xl font-bold text-orange-600">{candidato.pontuacaoGeral}%</span>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-lg mb-4 text-gray-900">Resultados Detalhados</h4>
        <div className="grid gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-gray-900">Teste Técnico</h5>
              <Badge className={getStatusColor(candidato.testes.tecnico.status)}>
                {candidato.testes.tecnico.status}
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Progress value={candidato.testes.tecnico.pontuacao} className="flex-1 h-2" />
              <span className="text-xl font-bold text-gray-900">{candidato.testes.tecnico.pontuacao}%</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-gray-900">Teste de Lógica</h5>
              <Badge className={getStatusColor(candidato.testes.logica.status)}>{candidato.testes.logica.status}</Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Progress value={candidato.testes.logica.pontuacao} className="flex-1 h-2" />
              <span className="text-xl font-bold text-gray-900">{candidato.testes.logica.pontuacao}%</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-gray-900">Teste Comportamental</h5>
              <Badge className={getStatusColor(candidato.testes.comportamental.status)}>
                {candidato.testes.comportamental.status}
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Progress value={candidato.testes.comportamental.pontuacao} className="flex-1 h-2" />
              <span className="text-xl font-bold text-gray-900">{candidato.testes.comportamental.pontuacao}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [vagaFilter, setVagaFilter] = useState("todas")

  const candidatosFiltrados = candidatos.filter((candidato) => {
    const matchesSearch =
      candidato.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidato.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidato.vaga.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || candidato.status === statusFilter
    const matchesVaga = vagaFilter === "todas" || candidato.vaga === vagaFilter

    return matchesSearch && matchesStatus && matchesVaga
  })

  const stats = {
    total: candidatos.length,
    aprovados: candidatos.filter((c) => c.status === "Aprovado").length,
    reprovados: candidatos.filter((c) => c.status === "Reprovado").length,
    emAnalise: candidatos.filter((c) => c.status === "Em Análise").length,
  }

  const vagas = [...new Set(candidatos.map((c) => c.vaga))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Reis office</h1>
                  <p className="text-xs text-gray-500">Sistema de Gestão</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/admin/criar-vaga">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Vaga
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Ver Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Painel de Candidatos</h2>
          <p className="text-gray-600">Gerencie e acompanhe o desempenho dos candidatos em tempo real</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Total de Candidatos</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Aprovados</p>
                  <p className="text-3xl font-bold text-emerald-600">{stats.aprovados}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Reprovados</p>
                  <p className="text-3xl font-bold text-red-600">{stats.reprovados}</p>
                </div>
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Em Análise</p>
                  <p className="text-3xl font-bold text-amber-600">{stats.emAnalise}</p>
                </div>
                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section */}
        <Card className="border-0 shadow-sm bg-white mb-6">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-lg font-semibold text-gray-900">Filtros de Busca</CardTitle>
            <CardDescription className="text-gray-600">
              Utilize os filtros para encontrar candidatos específicos
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Buscar Candidato</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Nome, email ou vaga..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Status</SelectItem>
                    <SelectItem value="Aprovado">Aprovado</SelectItem>
                    <SelectItem value="Reprovado">Reprovado</SelectItem>
                    <SelectItem value="Em Análise">Em Análise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Vaga</label>
                <Select value={vagaFilter} onValueChange={setVagaFilter}>
                  <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Selecione a vaga" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as Vagas</SelectItem>
                    {vagas.map((vaga) => (
                      <SelectItem key={vaga} value={vaga}>
                        {vaga}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidates Table */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Lista de Candidatos</CardTitle>
                <CardDescription className="text-gray-600">
                  Exibindo {candidatosFiltrados.length} de {candidatos.length} candidatos
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-100">
                    <TableHead className="font-semibold text-gray-700">Candidato</TableHead>
                    <TableHead className="font-semibold text-gray-700">Vaga</TableHead>
                    <TableHead className="font-semibold text-gray-700">Data</TableHead>
                    <TableHead className="font-semibold text-gray-700">Desempenho</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidatosFiltrados.map((candidato) => (
                    <TableRow key={candidato.id} className="border-gray-100 hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <div className="font-semibold text-gray-900">{candidato.nome}</div>
                          <div className="text-sm text-gray-500">{candidato.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700">{candidato.vaga}</TableCell>
                      <TableCell className="text-gray-700">
                        {new Date(candidato.dataAplicacao).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Progress value={candidato.pontuacaoGeral} className="w-20 h-2" />
                          <span className="text-sm font-semibold text-gray-900">{candidato.pontuacaoGeral}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(candidato.status)}>{candidato.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Detalhes
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-xl">Perfil do Candidato</DialogTitle>
                                <DialogDescription>
                                  Informações detalhadas e resultados completos dos testes
                                </DialogDescription>
                              </DialogHeader>
                              <CandidateDetails candidato={candidato} />
                            </DialogContent>
                          </Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Aprovar Candidato</DropdownMenuItem>
                              <DropdownMenuItem>Reprovar Candidato</DropdownMenuItem>
                              <DropdownMenuItem>Enviar Email</DropdownMenuItem>
                              <DropdownMenuItem>Gerar Relatório</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
