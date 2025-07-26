"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Briefcase,
  User,
  Mail,
  Phone,
  MapPin,
  Upload,
  FileText,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

// Dados dos testes
const testes = [
  {
    id: 1,
    nome: "Teste Técnico",
    descricao: "Avaliação de conhecimentos técnicos específicos da vaga",
    duracao: "45 minutos",
    questoes: 15,
    tipo: "multipla_escolha",
    status: "pendente",
  },
  {
    id: 2,
    nome: "Teste de Lógica",
    descricao: "Avaliação de raciocínio lógico e resolução de problemas",
    duracao: "30 minutos",
    questoes: 20,
    tipo: "multipla_escolha",
    status: "pendente",
  },
  {
    id: 3,
    nome: "Teste Comportamental",
    descricao: "Avaliação de perfil comportamental e soft skills",
    duracao: "25 minutos",
    questoes: 12,
    tipo: "dissertativa",
    status: "pendente",
  },
]

// Questões de exemplo
const questoesTecnicas = [
  {
    id: 1,
    pergunta: "Qual é a principal diferença entre let e var em JavaScript?",
    opcoes: [
      "let tem escopo de bloco, var tem escopo de função",
      "let é mais rápido que var",
      "var é mais moderno que let",
      "Não há diferença significativa",
    ],
    resposta_correta: 0,
  },
  {
    id: 2,
    pergunta: "O que é JSX no React?",
    opcoes: [
      "Uma biblioteca de CSS",
      "Uma extensão de sintaxe JavaScript",
      "Um framework backend",
      "Um banco de dados",
    ],
    resposta_correta: 1,
  },
  {
    id: 3,
    pergunta: "Qual hook é usado para gerenciar estado em componentes funcionais?",
    opcoes: ["useEffect", "useContext", "useState", "useReducer"],
    resposta_correta: 2,
  },
]

const questoesLogica = [
  {
    id: 1,
    pergunta: "Se todos os A são B, e alguns B são C, então:",
    opcoes: ["Todos os A são C", "Alguns A podem ser C", "Nenhum A é C", "Todos os C são A"],
    resposta_correta: 1,
  },
  {
    id: 2,
    pergunta: "Qual número completa a sequência: 2, 6, 12, 20, 30, ?",
    opcoes: ["40", "42", "44", "46"],
    resposta_correta: 1,
  },
]

const questoesComportamentais = [
  {
    id: 1,
    pergunta: "Descreva uma situação em que você teve que trabalhar sob pressão e como lidou com ela.",
    tipo: "dissertativa",
  },
  {
    id: 2,
    pergunta: "Como você lida com feedback negativo sobre seu trabalho?",
    tipo: "dissertativa",
  },
]

export default function TestPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string

  const [currentStep, setCurrentStep] = useState(-1) // -1: form pessoal, 0: overview, 1-3: testes
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [respostas, setRespostas] = useState<{ [key: string]: any }>({})
  const [testeAtual, setTesteAtual] = useState<any>(null)
  const [questoesAtuais, setQuestoesAtuais] = useState<any[]>([])
  const [tempoRestante, setTempoRestante] = useState(0)
  const [testesCompletos, setTestesCompletos] = useState<number[]>([])

  // Dados pessoais do candidato
  const [dadosPessoais, setDadosPessoais] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    linkedin: "",
    github: "",
    experiencia: "",
    formacao: "",
    motivacao: "",
  })

  const [curriculo, setCurriculo] = useState<File | null>(null)

  const handleDadosPessoaisChange = (field: string, value: string) => {
    setDadosPessoais((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCurriculoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCurriculo(file)
    }
  }

  const removerCurriculo = () => {
    setCurriculo(null)
  }

  const validarDadosPessoais = () => {
    return (
      dadosPessoais.nomeCompleto.trim() !== "" &&
      dadosPessoais.email.trim() !== "" &&
      dadosPessoais.telefone.trim() !== "" &&
      dadosPessoais.cidade.trim() !== "" &&
      curriculo !== null
    )
  }

  const prosseguirParaTestes = () => {
    if (validarDadosPessoais()) {
      setCurrentStep(0)
    } else {
      alert("Por favor, preencha todos os campos obrigatórios e anexe seu currículo.")
    }
  }

  const iniciarTeste = (testeId: number) => {
    const teste = testes.find((t) => t.id === testeId)
    if (!teste) return

    setTesteAtual(teste)
    setCurrentStep(testeId)
    setCurrentQuestion(0)

    // Definir questões baseadas no tipo de teste
    if (testeId === 1) {
      setQuestoesAtuais(questoesTecnicas)
      setTempoRestante(45 * 60) // 45 minutos em segundos
    } else if (testeId === 2) {
      setQuestoesAtuais(questoesLogica)
      setTempoRestante(30 * 60) // 30 minutos
    } else if (testeId === 3) {
      setQuestoesAtuais(questoesComportamentais)
      setTempoRestante(25 * 60) // 25 minutos
    }
  }

  const proximaPergunta = () => {
    if (currentQuestion < questoesAtuais.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      finalizarTeste()
    }
  }

  const finalizarTeste = () => {
    if (testeAtual) {
      setTestesCompletos([...testesCompletos, testeAtual.id])
      setCurrentStep(0)
      setTesteAtual(null)
      setCurrentQuestion(0)
    }
  }

  const salvarResposta = (resposta: any) => {
    const key = `${testeAtual.id}_${currentQuestion}`
    setRespostas({
      ...respostas,
      [key]: resposta,
    })
  }

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60)
    const secs = segundos % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Formulário de dados pessoais
  if (currentStep === -1) {
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
                  <p className="text-xs text-gray-500">Dados Pessoais</p>
                </div>
              </div>

              <Link href={`/vaga/${jobId}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Informações Pessoais</h2>
            <p className="text-lg text-gray-600">Preencha seus dados para prosseguir com a candidatura</p>
          </div>

          <div className="space-y-8">
            {/* Dados Básicos */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2 text-orange-600" />
                  Dados Básicos
                </CardTitle>
                <CardDescription className="text-gray-600">Informações básicas de contato</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nomeCompleto" className="text-sm font-medium text-gray-700">
                      Nome Completo *
                    </Label>
                    <Input
                      id="nomeCompleto"
                      placeholder="Seu nome completo"
                      value={dadosPessoais.nomeCompleto}
                      onChange={(e) => handleDadosPessoaisChange("nomeCompleto", e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      E-mail *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={dadosPessoais.email}
                        onChange={(e) => handleDadosPessoaisChange("email", e.target.value)}
                        className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="text-sm font-medium text-gray-700">
                      Telefone *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="telefone"
                        placeholder="(11) 99999-9999"
                        value={dadosPessoais.telefone}
                        onChange={(e) => handleDadosPessoaisChange("telefone", e.target.value)}
                        className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cidade" className="text-sm font-medium text-gray-700">
                      Cidade *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="cidade"
                        placeholder="Sua cidade"
                        value={dadosPessoais.cidade}
                        onChange={(e) => handleDadosPessoaisChange("cidade", e.target.value)}
                        className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estado" className="text-sm font-medium text-gray-700">
                      Estado
                    </Label>
                    <Input
                      id="estado"
                      placeholder="SP"
                      value={dadosPessoais.estado}
                      onChange={(e) => handleDadosPessoaisChange("estado", e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cep" className="text-sm font-medium text-gray-700">
                      CEP
                    </Label>
                    <Input
                      id="cep"
                      placeholder="00000-000"
                      value={dadosPessoais.cep}
                      onChange={(e) => handleDadosPessoaisChange("cep", e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endereco" className="text-sm font-medium text-gray-700">
                    Endereço Completo
                  </Label>
                  <Input
                    id="endereco"
                    placeholder="Rua, número, bairro"
                    value={dadosPessoais.endereco}
                    onChange={(e) => handleDadosPessoaisChange("endereco", e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Links Profissionais */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Links Profissionais</CardTitle>
                <CardDescription className="text-gray-600">
                  Compartilhe seus perfis profissionais (opcional)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="text-sm font-medium text-gray-700">
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      placeholder="https://linkedin.com/in/seuperfil"
                      value={dadosPessoais.linkedin}
                      onChange={(e) => handleDadosPessoaisChange("linkedin", e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github" className="text-sm font-medium text-gray-700">
                      GitHub
                    </Label>
                    <Input
                      id="github"
                      placeholder="https://github.com/seuusuario"
                      value={dadosPessoais.github}
                      onChange={(e) => handleDadosPessoaisChange("github", e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experiência e Formação */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Experiência e Formação</CardTitle>
                <CardDescription className="text-gray-600">Conte-nos sobre sua trajetória profissional</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="experiencia" className="text-sm font-medium text-gray-700">
                    Experiência Profissional
                  </Label>
                  <Textarea
                    id="experiencia"
                    placeholder="Descreva sua experiência profissional relevante..."
                    value={dadosPessoais.experiencia}
                    onChange={(e) => handleDadosPessoaisChange("experiencia", e.target.value)}
                    className="min-h-24 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="formacao" className="text-sm font-medium text-gray-700">
                    Formação Acadêmica
                  </Label>
                  <Textarea
                    id="formacao"
                    placeholder="Descreva sua formação acadêmica..."
                    value={dadosPessoais.formacao}
                    onChange={(e) => handleDadosPessoaisChange("formacao", e.target.value)}
                    className="min-h-24 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivacao" className="text-sm font-medium text-gray-700">
                    Por que você quer trabalhar conosco?
                  </Label>
                  <Textarea
                    id="motivacao"
                    placeholder="Conte-nos sua motivação para esta vaga..."
                    value={dadosPessoais.motivacao}
                    onChange={(e) => handleDadosPessoaisChange("motivacao", e.target.value)}
                    className="min-h-24 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Upload de Currículo */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-orange-600" />
                  Currículo *
                </CardTitle>
                <CardDescription className="text-gray-600">Anexe seu currículo em formato PDF</CardDescription>
              </CardHeader>
              <CardContent>
                {!curriculo ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Clique para selecionar seu currículo</p>
                    <p className="text-xs text-gray-500 mb-4">Apenas arquivos PDF (máx. 5MB)</p>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleCurriculoUpload}
                      className="hidden"
                      id="curriculo-upload"
                    />
                    <Label htmlFor="curriculo-upload">
                      <Button type="button" variant="outline" className="cursor-pointer bg-transparent">
                        Selecionar Arquivo
                      </Button>
                    </Label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{curriculo.name}</p>
                        <p className="text-xs text-gray-500">{(curriculo.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removerCurriculo}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Botão de Prosseguir */}
            <div className="flex justify-center">
              <Button
                onClick={prosseguirParaTestes}
                disabled={!validarDadosPessoais()}
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 px-8"
              >
                Prosseguir para os Testes
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Tela de overview dos testes
  if (currentStep === 0) {
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
                  <p className="text-xs text-gray-500">Processo Seletivo</p>
                </div>
              </div>

              <Button variant="ghost" size="sm" onClick={() => setCurrentStep(-1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Processo Seletivo</h2>
            <p className="text-lg text-gray-600">Complete todos os testes abaixo para finalizar sua candidatura</p>
          </div>

          {/* Progress */}
          <Card className="border-0 shadow-sm bg-white mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">
                  Progresso: {testesCompletos.length} de {testes.length} testes completos
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round((testesCompletos.length / testes.length) * 100)}%
                </span>
              </div>
              <Progress value={(testesCompletos.length / testes.length) * 100} className="h-2" />
            </CardContent>
          </Card>

          {/* Tests List */}
          <div className="space-y-6">
            {testes.map((teste, index) => {
              const isCompleto = testesCompletos.includes(teste.id)
              const isDisponivel = index === 0 || testesCompletos.includes(testes[index - 1].id)

              return (
                <Card key={teste.id} className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isCompleto
                              ? "bg-green-100 text-green-600"
                              : isDisponivel
                                ? "bg-orange-100 text-orange-600"
                                : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {isCompleto ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <span className="font-bold">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900">{teste.nome}</CardTitle>
                          <CardDescription className="text-gray-600">{teste.descricao}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isCompleto && <Badge className="bg-green-50 text-green-700 border-green-200">Completo</Badge>}
                        {!isCompleto && !isDisponivel && (
                          <Badge variant="outline" className="text-gray-500">
                            Bloqueado
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{teste.duracao}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{teste.questoes} questões</span>
                        </div>
                      </div>

                      {!isCompleto && isDisponivel && (
                        <Button onClick={() => iniciarTeste(teste.id)} className="bg-orange-600 hover:bg-orange-700">
                          <Play className="w-4 h-4 mr-2" />
                          Iniciar Teste
                        </Button>
                      )}

                      {isCompleto && (
                        <Button variant="outline" disabled>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Concluído
                        </Button>
                      )}

                      {!isDisponivel && (
                        <Button variant="outline" disabled>
                          Aguardando
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Finalize Button */}
          {testesCompletos.length === testes.length && (
            <Card className="border-0 shadow-sm bg-green-50 border-green-200 mt-8">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Parabéns! Todos os testes foram concluídos
                </h3>
                <p className="text-green-700 mb-4">
                  Sua candidatura foi enviada com sucesso. Você receberá um e-mail com o resultado em breve.
                </p>
                <Button onClick={() => router.push("/")} className="bg-green-600 hover:bg-green-700">
                  Finalizar Candidatura
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    )
  }

  // Tela do teste em andamento
  const questaoAtual = questoesAtuais[currentQuestion]

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
                <h1 className="text-xl font-bold text-gray-900">{testeAtual?.nome}</h1>
                <p className="text-xs text-gray-500">
                  Questão {currentQuestion + 1} de {questoesAtuais.length}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatarTempo(tempoRestante)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progresso do Teste</span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentQuestion + 1) / questoesAtuais.length) * 100)}%
            </span>
          </div>
          <Progress value={((currentQuestion + 1) / questoesAtuais.length) * 100} className="h-2" />
        </div>

        {/* Question */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">{questaoAtual?.pergunta}</CardTitle>
          </CardHeader>
          <CardContent>
            {questaoAtual?.opcoes ? (
              // Múltipla escolha
              <RadioGroup
                value={respostas[`${testeAtual.id}_${currentQuestion}`] || ""}
                onValueChange={(value) => salvarResposta(Number.parseInt(value))}
              >
                {questaoAtual.opcoes.map((opcao: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={index.toString()} id={`opcao-${index}`} />
                    <Label htmlFor={`opcao-${index}`} className="flex-1 cursor-pointer">
                      {opcao}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              // Dissertativa
              <Textarea
                placeholder="Digite sua resposta aqui..."
                value={respostas[`${testeAtual.id}_${currentQuestion}`] || ""}
                onChange={(e) => salvarResposta(e.target.value)}
                className="min-h-32"
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => setCurrentStep(0)}>
            Pausar Teste
          </Button>

          <Button
            onClick={proximaPergunta}
            disabled={!respostas[`${testeAtual.id}_${currentQuestion}`]}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {currentQuestion === questoesAtuais.length - 1 ? "Finalizar Teste" : "Próxima Questão"}
          </Button>
        </div>
      </main>
    </div>
  )
}
