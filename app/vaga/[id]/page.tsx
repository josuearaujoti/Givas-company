"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, MapPin, DollarSign, Building2, Calendar, Users, Briefcase, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Dados mockados das vagas (mesmo do arquivo anterior)
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
    descricao:
      "Estamos procurando um desenvolvedor frontend experiente para se juntar à nossa equipe de produtos digitais. Você trabalhará em projetos desafiadores, desenvolvendo interfaces modernas e responsivas para nossos clientes corporativos.",
    requisitos: ["React.js", "TypeScript", "Next.js", "Tailwind CSS", "Git", "Jest", "Cypress"],
    responsabilidades: [
      "Desenvolver interfaces de usuário modernas e responsivas",
      "Colaborar com designers e desenvolvedores backend",
      "Implementar testes automatizados",
      "Otimizar performance das aplicações",
      "Participar de code reviews e reuniões técnicas",
    ],
    beneficios: [
      "Vale refeição R$ 800",
      "Plano de saúde e odontológico",
      "Auxílio home office R$ 500",
      "Horário flexível",
      "Desenvolvimento profissional",
    ],
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
    descricao:
      "Oportunidade única para analista de dados experiente trabalhar com grandes volumes de dados e machine learning em projetos inovadores.",
    requisitos: ["Python", "SQL", "Power BI", "Machine Learning", "Estatística", "Pandas", "Scikit-learn"],
    responsabilidades: [
      "Analisar grandes volumes de dados",
      "Criar dashboards e relatórios",
      "Desenvolver modelos preditivos",
      "Apresentar insights para stakeholders",
      "Automatizar processos de análise",
    ],
    beneficios: [
      "Vale refeição R$ 1.000",
      "Plano de saúde premium",
      "Participação nos lucros",
      "Cursos e certificações",
      "Trabalho híbrido",
    ],
    publicadoEm: "2024-01-19",
    status: "ativa",
  },
]

export default function JobDetailsPage() {
  const params = useParams()
  const jobId = Number.parseInt(params.id as string)
  const vaga = vagas.find((v) => v.id === jobId)

  if (!vaga) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vaga não encontrada</h1>
          <Link href="/">
            <Button>Voltar para vagas</Button>
          </Link>
        </div>
      </div>
    )
  }

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
                <h1 className="text-xl font-bold text-gray-900">RH Jobs</h1>
                <p className="text-xs text-gray-500">Portal de Vagas</p>
              </div>
            </div>

            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Header */}
        <Card className="border-0 shadow-sm bg-white mb-8">
          <CardHeader className="pb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{vaga.titulo}</CardTitle>
                <div className="flex items-center space-x-2 text-gray-600 mb-3">
                  <Building2 className="w-5 h-5" />
                  <span className="text-lg font-medium">{vaga.empresa}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{vaga.localizacao}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-medium text-green-600">{vaga.salario}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Publicado em {new Date(vaga.publicadoEm).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Badge className="bg-orange-50 text-orange-700 border-orange-200 w-fit">{vaga.modalidade}</Badge>
                <Badge variant="outline" className="w-fit">
                  {vaga.tipo}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-center">
              <Link href={`/candidatar/${vaga.id}`}>
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 px-8">
                  <Users className="w-5 h-5 mr-2" />
                  Candidatar-se à Vaga
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Descrição da Vaga</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{vaga.descricao}</p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Responsabilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {vaga.responsabilidades.map((resp, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{resp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Benefícios</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {vaga.beneficios.map((beneficio, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Requirements */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Requisitos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {vaga.requisitos.map((req, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {req}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Info */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Informações da Vaga</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Tipo de Contrato</h4>
                  <p className="text-gray-600">{vaga.tipo}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Modalidade</h4>
                  <p className="text-gray-600">{vaga.modalidade}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Localização</h4>
                  <p className="text-gray-600">{vaga.localizacao}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Salário</h4>
                  <p className="text-green-600 font-medium">{vaga.salario}</p>
                </div>
              </CardContent>
            </Card>

            {/* Apply Button (Mobile) */}
            <div className="lg:hidden">
              <Link href={`/candidatar/${vaga.id}`}>
                <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700">
                  <Users className="w-5 h-5 mr-2" />
                  Candidatar-se à Vaga
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
