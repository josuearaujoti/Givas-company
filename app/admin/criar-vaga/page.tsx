"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X, Users, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function CreateJobPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    titulo: "",
    empresa: "",
    localizacao: "",
    salario: "",
    tipo: "",
    modalidade: "",
    resumoRequisitos: "",
    descricao: "",
    responsabilidades: "",
    beneficios: "",
    requisitos: [] as string[],
  })

  const [novoRequisito, setNovoRequisito] = useState("")
  const [arquivos, setArquivos] = useState<File[]>([])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const adicionarRequisito = () => {
    if (novoRequisito.trim() && !formData.requisitos.includes(novoRequisito.trim())) {
      setFormData((prev) => ({
        ...prev,
        requisitos: [...prev.requisitos, novoRequisito.trim()],
      }))
      setNovoRequisito("")
    }
  }

  const removerRequisito = (requisito: string) => {
    setFormData((prev) => ({
      ...prev,
      requisitos: prev.requisitos.filter((r) => r !== requisito),
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setArquivos((prev) => [...prev, ...files])
  }

  const removerArquivo = (index: number) => {
    setArquivos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Aqui você salvaria os dados da vaga
    console.log("Dados da vaga:", formData)
    console.log("Arquivos:", arquivos)

    // Simular salvamento e redirecionamento
    alert("Vaga criada com sucesso!")
    router.push("/admin")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">RH Admin</h1>
                <p className="text-xs text-gray-500">Criar Nova Vaga</p>
              </div>
            </div>

            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Criar Nova Vaga</h2>
          <p className="text-gray-600">Preencha as informações abaixo para publicar uma nova vaga</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Informações Básicas</CardTitle>
              <CardDescription className="text-gray-600">Dados principais da vaga de emprego</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="titulo" className="text-sm font-medium text-gray-700">
                    Título da Vaga *
                  </Label>
                  <Input
                    id="titulo"
                    placeholder="Ex: Desenvolvedor Frontend React"
                    value={formData.titulo}
                    onChange={(e) => handleInputChange("titulo", e.target.value)}
                    required
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empresa" className="text-sm font-medium text-gray-700">
                    Nome da Empresa *
                  </Label>
                  <Input
                    id="empresa"
                    placeholder="Ex: TechCorp Solutions"
                    value={formData.empresa}
                    onChange={(e) => handleInputChange("empresa", e.target.value)}
                    required
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="localizacao" className="text-sm font-medium text-gray-700">
                    Localização *
                  </Label>
                  <Input
                    id="localizacao"
                    placeholder="Ex: São Paulo, SP"
                    value={formData.localizacao}
                    onChange={(e) => handleInputChange("localizacao", e.target.value)}
                    required
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salario" className="text-sm font-medium text-gray-700">
                    Faixa Salarial
                  </Label>
                  <Input
                    id="salario"
                    placeholder="Ex: R$ 8.000 - R$ 12.000"
                    value={formData.salario}
                    onChange={(e) => handleInputChange("salario", e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo" className="text-sm font-medium text-gray-700">
                    Tipo de Contrato *
                  </Label>
                  <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
                    <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CLT">CLT</SelectItem>
                      <SelectItem value="PJ">PJ</SelectItem>
                      <SelectItem value="Estágio">Estágio</SelectItem>
                      <SelectItem value="Freelancer">Freelancer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modalidade" className="text-sm font-medium text-gray-700">
                    Modalidade *
                  </Label>
                  <Select value={formData.modalidade} onValueChange={(value) => handleInputChange("modalidade", value)}>
                    <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                      <SelectValue placeholder="Selecione a modalidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Remoto">Remoto</SelectItem>
                      <SelectItem value="Presencial">Presencial</SelectItem>
                      <SelectItem value="Híbrido">Híbrido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resumoRequisitos" className="text-sm font-medium text-gray-700">
                  Resumo dos Requisitos *
                </Label>
                <Input
                  id="resumoRequisitos"
                  placeholder="Ex: React, TypeScript, 3+ anos experiência"
                  value={formData.resumoRequisitos}
                  onChange={(e) => handleInputChange("resumoRequisitos", e.target.value)}
                  required
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Detailed Description */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Descrição Detalhada</CardTitle>
              <CardDescription className="text-gray-600">Informações completas sobre a vaga</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="descricao" className="text-sm font-medium text-gray-700">
                  Descrição da Vaga *
                </Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva a vaga, o que a empresa faz, o ambiente de trabalho..."
                  value={formData.descricao}
                  onChange={(e) => handleInputChange("descricao", e.target.value)}
                  required
                  className="min-h-32 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsabilidades" className="text-sm font-medium text-gray-700">
                  Responsabilidades
                </Label>
                <Textarea
                  id="responsabilidades"
                  placeholder="Liste as principais responsabilidades do cargo (uma por linha)"
                  value={formData.responsabilidades}
                  onChange={(e) => handleInputChange("responsabilidades", e.target.value)}
                  className="min-h-24 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="beneficios" className="text-sm font-medium text-gray-700">
                  Benefícios
                </Label>
                <Textarea
                  id="beneficios"
                  placeholder="Liste os benefícios oferecidos (um por linha)"
                  value={formData.beneficios}
                  onChange={(e) => handleInputChange("beneficios", e.target.value)}
                  className="min-h-24 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Requisitos Técnicos</CardTitle>
              <CardDescription className="text-gray-600">Habilidades e conhecimentos necessários</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ex: React.js, Python, SQL..."
                  value={novoRequisito}
                  onChange={(e) => setNovoRequisito(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), adicionarRequisito())}
                  className="flex-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
                <Button type="button" onClick={adicionarRequisito} variant="outline">
                  Adicionar
                </Button>
              </div>

              {formData.requisitos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.requisitos.map((requisito, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {requisito}
                      <button
                        type="button"
                        onClick={() => removerRequisito(requisito)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Documentos Anexos</CardTitle>
              <CardDescription className="text-gray-600">
                Anexe manuais, descrições adicionais ou outros documentos (PDF)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Clique para selecionar arquivos ou arraste e solte</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload">
                  <Button type="button" variant="outline" className="cursor-pointer bg-transparent">
                    Selecionar Arquivos
                  </Button>
                </Label>
              </div>

              {arquivos.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Arquivos Selecionados:</h4>
                  {arquivos.map((arquivo, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{arquivo.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removerArquivo(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Link href="/admin">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              <Save className="w-4 h-4 mr-2" />
              Publicar Vaga
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
