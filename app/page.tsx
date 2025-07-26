"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MapPin, DollarSign, Building2, Users, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados mockados das vagas
const vagas = [
  {
    id: 1,
    titulo: "Desenvolvedor Frontend React",
    empresa: "TechCorp Solutions",
    localizacao: "São Paulo, SP",
    salario: "R$ 8.000 - R$ 12.000",
    tipo: "CLT",
    modalidade: "Remoto",
    resumoRequisitos: "React, TypeScript, 3+ anos experiência",
    descricao: "Buscamos desenvolvedor frontend experiente para integrar nossa equipe de produtos digitais.",
    requisitos: ["React.js", "TypeScript", "Next.js", "Tailwind CSS", "Git"],
    publicadoEm: "2024-01-20",
    status: "ativa",
  },
  {
    id: 2,
    titulo: "Analista de Dados Sênior",
    empresa: "DataInsights Corp",
    localizacao: "Rio de Janeiro, RJ",
    salario: "R$ 10.000 - R$ 15.000",
    tipo: "CLT",
    modalidade: "Híbrido",
    resumoRequisitos: "Python, SQL, Power BI, 5+ anos",
    descricao: "Oportunidade para analista de dados experiente trabalhar com grandes volumes de dados.",
    requisitos: ["Python", "SQL", "Power BI", "Machine Learning", "Estatística"],
    publicadoEm: "2024-01-19",
    status: "ativa",
  },
  {
    id: 3,
    titulo: "Designer UX/UI",
    empresa: "Creative Studio",
    localizacao: "Belo Horizonte, MG",
    salario: "R$ 6.000 - R$ 9.000",
    tipo: "CLT",
    modalidade: "Presencial",
    resumoRequisitos: "Figma, Adobe XD, Portfolio, 2+ anos",
    descricao: "Procuramos designer criativo para desenvolver interfaces incríveis para nossos clientes.",
    requisitos: ["Figma", "Adobe XD", "Photoshop", "Prototipagem", "Design System"],
    publicadoEm: "2024-01-18",
    status: "ativa",
  },
  {
    id: 4,
    titulo: "Desenvolvedor Backend Node.js",
    empresa: "StartupTech",
    localizacao: "Florianópolis, SC",
    salario: "R$ 9.000 - R$ 13.000",
    tipo: "CLT",
    modalidade: "Remoto",
    resumoRequisitos: "Node.js, MongoDB, AWS, 4+ anos",
    descricao: "Desenvolvedor backend para arquitetar e desenvolver APIs robustas e escaláveis.",
    requisitos: ["Node.js", "MongoDB", "AWS", "Docker", "Microserviços"],
    publicadoEm: "2024-01-17",
    status: "ativa",
  },
  {
    id: 5,
    titulo: "Product Manager",
    empresa: "InnovaCorp",
    localizacao: "São Paulo, SP",
    salario: "R$ 12.000 - R$ 18.000",
    tipo: "CLT",
    modalidade: "Híbrido",
    resumoRequisitos: "Gestão de produtos, Agile, 5+ anos",
    descricao: "Lidere o desenvolvimento de produtos inovadores em ambiente ágil e colaborativo.",
    requisitos: ["Gestão de Produtos", "Scrum", "Analytics", "Roadmap", "Stakeholder Management"],
    publicadoEm: "2024-01-16",
    status: "ativa",
  },
  {
    id: 6,
    titulo: "Engenheiro DevOps",
    empresa: "CloudTech Solutions",
    localizacao: "Remoto",
    salario: "R$ 11.000 - R$ 16.000",
    tipo: "CLT",
    modalidade: "Remoto",
    resumoRequisitos: "AWS, Kubernetes, CI/CD, 4+ anos",
    descricao: "Engenheiro DevOps para automatizar e otimizar nossa infraestrutura em nuvem.",
    requisitos: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
    publicadoEm: "2024-01-15",
    status: "ativa",
  },
]

function JobCard({ vaga }: { vaga: any }) {
  return (
    <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-200 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">{vaga.titulo}</CardTitle>
          <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">
            {vaga.modalidade}
          </Badge>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Building2 className="w-4 h-4" />
          <span className="text-sm font-medium">{vaga.empresa}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{vaga.localizacao}</span>
          </div>

          {vaga.salario && (
            <div className="flex items-center space-x-2 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium text-green-600">{vaga.salario}</span>
            </div>
          )}

          <div className="text-sm text-gray-600 line-clamp-2">
            <strong>Requisitos:</strong> {vaga.resumoRequisitos}
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {vaga.requisitos.slice(0, 3).map((req: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {req}
              </Badge>
            ))}
            {vaga.requisitos.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{vaga.requisitos.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex justify-between items-center pt-3">
            <span className="text-xs text-gray-500">
              Publicado em {new Date(vaga.publicadoEm).toLocaleDateString("pt-BR")}
            </span>
            <Link href={`/vaga/${vaga.id}`}>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                Ver Detalhes
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("todas")
  const [modalityFilter, setModalityFilter] = useState("todas")

  const vagasFiltradas = vagas.filter((vaga) => {
    const matchesSearch =
      vaga.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaga.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaga.resumoRequisitos.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLocation =
      locationFilter === "todas" || vaga.localizacao.toLowerCase().includes(locationFilter.toLowerCase())

    const matchesModality = modalityFilter === "todas" || vaga.modalidade === modalityFilter

    return matchesSearch && matchesLocation && matchesModality
  })

  const locations = [...new Set(vagas.map((v) => v.localizacao))]
  const modalities = [...new Set(vagas.map((v) => v.modalidade))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Reis Office</h1>
                <p className="text-xs text-gray-500">Portal de Vagas</p>
              </div>
            </div>

            <nav className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                <Button variant="ghost" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Encontre sua próxima oportunidade</h2>
          <p className="text-xl text-orange-100 mb-8">Conectamos talentos com as melhores empresas do mercado</p>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Buscar por cargo, empresa ou palavra-chave..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-gray-900 border-0 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-50 h-12 px-8">
                Buscar Vagas
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{vagas.length}</div>
              <div className="text-gray-600">Vagas Disponíveis</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{new Set(vagas.map((v) => v.empresa)).size}</div>
              <div className="text-gray-600">Empresas Parceiras</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{locations.length}</div>
              <div className="text-gray-600">Cidades</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm bg-white mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Filtrar Vagas</CardTitle>
            <CardDescription className="text-gray-600">Refine sua busca usando os filtros abaixo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Localização</label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a localização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as localizações</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Modalidade</label>
                <Select value={modalityFilter} onValueChange={setModalityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a modalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as modalidades</SelectItem>
                    {modalities.map((modality) => (
                      <SelectItem key={modality} value={modality}>
                        {modality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Vagas Disponíveis ({vagasFiltradas.length})</h3>
          <p className="text-gray-600">Encontre a oportunidade perfeita para sua carreira</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vagasFiltradas.map((vaga) => (
            <JobCard key={vaga.id} vaga={vaga} />
          ))}
        </div>

        {vagasFiltradas.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma vaga encontrada</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou termos de busca</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">RH Jobs</span>
              </div>
              <p className="text-gray-400">Conectando talentos com oportunidades desde 2024.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Para Candidatos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Buscar Vagas</li>
                <li>Criar Perfil</li>
                <li>Dicas de Carreira</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Para Empresas</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Publicar Vagas</li>
                <li>Gerenciar Candidatos</li>
                <li>Planos Corporativos</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RH Jobs. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
