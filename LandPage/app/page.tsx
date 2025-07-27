"use client"

import { FileText, Upload, BookOpen, Users, Clock, Shield, Star, Phone, Mail, MapPin } from "lucide-react"
import { useEffect, useState } from "react"


export default function HomePage() {
  const [counters, setCounters] = useState({
    companies: 0,
    candidates: 0,
    tests: 0,
    satisfaction: 0,
  })

  const [showScrollTop, setShowScrollTop] = useState(false)

  // Animação dos contadores
  useEffect(() => {
    const animateCounters = () => {
      const targets = {
        companies: 150,
        candidates: 5000,
        tests: 25000,
        satisfaction: 98,
      }

      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps

        setCounters({
          companies: Math.floor(targets.companies * progress),
          candidates: Math.floor(targets.candidates * progress),
          tests: Math.floor(targets.tests * progress),
          satisfaction: Math.floor(targets.satisfaction * progress),
        })

        if (step >= steps) {
          clearInterval(timer)
          setCounters(targets)
        }
      }, stepDuration)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters()
          observer.disconnect()
        }
      })
    })

    const statsSection = document.getElementById("stats-section")
    if (statsSection) {
      observer.observe(statsSection)
    }

    return () => observer.disconnect()
  }, [])

  // Adicionar useEffect para controlar scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setShowScrollTop(scrollPosition > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {/* Bootstrap CSS */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

      {/* Custom CSS */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }

        .nav-link:hover {
          color: #f8f9fa !important;
          text-shadow: 0 0 5px rgba(255,255,255,0.5);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fade-up {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-fade-left {
          animation: fadeInLeft 0.8s ease-out;
        }

        .animate-fade-right {
          animation: fadeInRight 0.8s ease-out;
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }

        .card-hover {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(228, 123, 56, 0.2) !important;
        }

        .btn-primary-custom {
          background-color: #e47b38;
          border-color: #e47b38;
          transition: all 0.3s ease;
        }

        .btn-primary-custom:hover {
          background-color: #d16b2a;
          border-color: #d16b2a;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(228, 123, 56, 0.3);
        }

        .icon-bounce {
          transition: transform 0.3s ease;
        }

        .icon-bounce:hover {
          transform: scale(1.1) rotate(5deg);
        }

        .gradient-bg {
          background: linear-gradient(135deg, #e47b38 0%, #d16b2a 100%);
        }

        .text-gradient {
          background: linear-gradient(135deg, #e47b38 0%, #d16b2a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .testimonial-card {
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: scale(1.02);
        }

        .stats-number {
          font-size: 3rem;
          font-weight: bold;
          color: #e47b38;
        }

        @media (max-width: 768px) {
          .stats-number {
            font-size: 2rem;
          }
        }

        @media (max-width: 768px) {
          .mobile-nav {
            flex-direction: column;
            gap: 1rem !important;
          }
          
          .mobile-nav nav {
            flex-direction: column;
            gap: 1rem !important;
          }
        }

        .scroll-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: #e47b38;
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(228, 123, 56, 0.3);
          transition: all 0.3s ease;
          z-index: 1000;
          opacity: 0;
          transform: translateY(20px);
        }

        .scroll-to-top.show {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-to-top:hover {
          background: #d16b2a;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(228, 123, 56, 0.4);
        }
      `}</style>

      <div className="min-vh-100 d-flex flex-column">
        {/* Header */}
        <header className={`gradient-bg text-white py-4 animate-fade-up`}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4">        <div className="col-md-2 d-flex justify-content-center">

              </div>

                <h2 className="mb-0 fw-bold">Reis Office</h2>
                <small className="opacity-75">Inovação em Gestão de RH</small>
              </div>
              <div className="col-md-8">
                <div
                  className="mobile-nav"
                  style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2rem" }}
                >
                  <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
                    <a
                      href="#inicio"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontSize: "16px",
                        transition: "all 0.3s ease",
                        padding: "8px 12px",
                        borderRadius: "4px",
                      }}
                      onMouseOver={(e) => {
                        (e.target as HTMLElement).style.color = "#f8f9fa";
                        (e.target as HTMLElement).style.textShadow = "0 0 5px rgba(255,255,255,0.5)";
                        (e.target as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)";
                      }}
                      onMouseOut={(e) => {
                        (e.target as HTMLElement).style.color = "white";
                        (e.target as HTMLElement).style.textShadow = "none";
                        (e.target as HTMLElement).style.backgroundColor = "transparent";
                      }}
                    >
                      Início
                    </a>
                    <a
                      href="#funcionalidades"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontSize: "16px",
                        transition: "all 0.3s ease",
                        padding: "8px 12px",
                        borderRadius: "4px",
                      }}
                      onMouseOver={(e) => {
                        (e.target as HTMLElement).style.color = "#f8f9fa";
                        (e.target as HTMLElement).style.textShadow = "0 0 5px rgba(255,255,255,0.5)";
                        (e.target as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)";
                      }}
                      onMouseOut={(e) => {
                        (e.target as HTMLElement).style.color = "white";
                        (e.target as HTMLElement).style.textShadow = "none";
                        (e.target as HTMLElement).style.backgroundColor = "transparent";
                      }}
                    >
                      Soluções
                    </a>
                    <a
                      href="#beneficios"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontSize: "16px",
                        transition: "all 0.3s ease",
                        padding: "8px 12px",
                        borderRadius: "4px",
                      }}
                      onMouseOver={(e) => {
                        (e.target as HTMLElement).style.color = "#f8f9fa";
                        (e.target as HTMLElement).style.textShadow = "0 0 5px rgba(255,255,255,0.5)";
                        (e.target as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)";
                      }}
                      onMouseOut={(e) => {
                        (e.target as HTMLElement).style.color = "white";
                        (e.target as HTMLElement).style.textShadow = "none";
                        (e.target as HTMLElement).style.backgroundColor = "transparent"
                      }}
                    >
                      Sobre
                    </a>
                    <a
                      href="#contato"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontSize: "16px",
                        transition: "all 0.3s ease",
                        padding: "8px 12px",
                        borderRadius: "4px",
                      }}
                      onMouseOver={(e) => {
                        (e.target as HTMLElement).style.color = "#f8f9fa";
                        (e.target as HTMLElement).style.textShadow = "0 0 5px rgba(255,255,255,0.5)";
                        (e.target as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)"
                      }}
                      onMouseOut={(e) => {
                        (e.target as HTMLElement).style.color = "white";
                        (e.target as HTMLElement).style.textShadow = "none";
                        (e.target as HTMLElement).style.backgroundColor = "transparent";
                      }}
                    >
                      Contato
                    </a>
                  </nav>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "2px solid white",
                      color: "white",
                      padding: "10px 24px",
                      borderRadius: "25px",
                      fontWeight: "bold",
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontSize: "16px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = "white";
                      (e.target as HTMLElement).style.color = "#e47b38";
                      (e.target as HTMLElement).style.transform = "scale(1.05)"
                    }}
                    onMouseOut={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = "transparent";
                      (e.target as HTMLElement).style.color = "white";
                      (e.target as HTMLElement).style.transform = "scale(1)"
                    }}
                  >
                    Entrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="inicio" className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 animate-fade-up">
                <h1 className="display-4 fw-bold mb-4 text-gradient">Sistema de Automação de Processos Seletivos</h1>
                <div className="lead text-muted mb-4">
                  <p className="mb-3 animate-fade-left">
                    Nossa plataforma revoluciona a gestão de recursos humanos através da automação completa de processos
                    seletivos, proporcionando maior eficiência e organização para sua empresa.
                  </p>
                  <p className="mb-4 animate-fade-right">
                    Com tecnologia de ponta, oferecemos uma solução integrada que digitaliza todas as etapas do
                    recrutamento, desde a aplicação de testes até o armazenamento seguro de documentos, otimizando tempo
                    e recursos.
                  </p>
                </div>
                <a href="https://www.reisoffice.com.br/" target=".blank"><button className="btn btn-lg px-4 py-3 fw-bold btn-primary-custom text-white animate-pulse" >
                  Conheça Nossa Empresa
                </button></a>
              </div>
              <div className="col-lg-5 animate-fade-right">
                <div className="text-end">
                  <img
                    src="/guyatinitial.svg"
                    alt="Equipe de RH trabalhando com tecnologica e automação"
                    className="img-fluid rounded "
                    style={{ maxHeight: "450px", objectFit: "cover", marginLeft: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats-section" className="py-5 gradient-bg text-white">
          <div className="container">
            <div className="row text-center">
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="stats-number" style={{ color: "#f8f9fa" }}>{counters.companies}+</div>
                <p className="mb-0">Empresas Atendidas</p>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="stats-number" style={{ color: "#f8f9fa" }}>{counters.candidates.toLocaleString()}+</div>
                <p className="mb-0">Candidatos Avaliados</p>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="stats-number" style={{ color: "#f8f9fa" }}>{counters.tests.toLocaleString()}+</div>
                <p className="mb-0">Testes Aplicados</p>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="stats-number" style={{ color: "#f8f9fa" }}>{counters.satisfaction}%</div>
                <p className="mb-0">Satisfação dos Clientes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="funcionalidades" className="py-5">
          <div className="container">
            <div className="row justify-content-center text-center mb-5">
              <div className="col-lg-8 animate-fade-up">
                <h2 className="fw-bold mb-3 text-gradient">Nossas Funcionalidades</h2>
                <p className="text-muted">Descubra como nossa plataforma pode transformar seus processos seletivos</p>
              </div>
            </div>
            <div className="row g-4">
              {/* Testes Online */}
              <div className="col-lg-4 col-md-6 animate-fade-up">
                <div className="card h-100 shadow-sm border-0 card-hover">
                  <div className="card-body text-center p-4">
                    <div
                      className="rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center icon-bounce"
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#e47b38",
                      }}
                    >
                      <FileText size={40} color="white" />
                    </div>
                    <h4 className="card-title fw-bold mb-3" style={{ color: "#e47b38" }}>
                      Testes Online
                    </h4>
                    <p className="card-text text-muted">
                      Plataforma completa para criação e aplicação de testes online personalizados, com correção
                      automática e relatórios detalhados de desempenho dos candidatos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Envio de Manuais */}
              <div className="col-lg-4 col-md-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <div className="card h-100 shadow-sm border-0 card-hover">
                  <div className="card-body text-center p-4">
                    <div
                      className="rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center icon-bounce"
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#e47b38",
                      }}
                    >
                      <BookOpen size={40} color="white" />
                    </div>
                    <h4 className="card-title fw-bold mb-3" style={{ color: "#e47b38" }}>
                      Envio de Manuais
                    </h4>
                    <p className="card-text text-muted">
                      Distribuição digital automatizada de manuais, orientações e materiais informativos para
                      candidatos, com controle de acesso e confirmação de leitura.
                    </p>
                  </div>
                </div>
              </div>

              {/* Armazenamento de Documentos */}
              <div className="col-lg-4 col-md-6 mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
                <div className="card h-100 shadow-sm border-0 card-hover">
                  <div className="card-body text-center p-4">
                    <div
                      className="rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center icon-bounce"
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#e47b38",
                      }}
                    >
                      <Upload size={40} color="white" />
                    </div>
                    <h4 className="card-title fw-bold mb-3" style={{ color: "#e47b38" }}>
                      Armazenamento de Documentos
                    </h4>
                    <p className="card-text text-muted">
                      Sistema seguro para upload e armazenamento de documentos pessoais dos candidatos, com criptografia
                      avançada e backup automático em nuvem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="beneficios" className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="container">
            <div className="row justify-content-center text-center mb-5">
              <div className="col-lg-8 animate-fade-up">
                <h2 className="fw-bold mb-3 text-gradient">Por que escolher nossa solução?</h2>
                <p className="text-muted">Benefícios que fazem a diferença no seu processo seletivo</p>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-lg-4 col-md-6 animate-fade-left">
                <div className="d-flex align-items-start">
                  <div className="flex-shrink-0 me-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#e47b38",
                      }}
                    >
                      <Clock size={24} color="white" />
                    </div>
                  </div>
                  <div>
                    <h5 className="fw-bold" style={{ color: "#e47b38" }}>
                      Economia de Tempo
                    </h5>
                    <p className="text-muted mb-0">Reduza em até 70% o tempo gasto em processos seletivos manuais</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 animate-fade-up">
                <div className="d-flex align-items-start">
                  <div className="flex-shrink-0 me-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#e47b38",
                      }}
                    >
                      <Shield size={24} color="white" />
                    </div>
                  </div>
                  <div>
                    <h5 className="fw-bold" style={{ color: "#e47b38" }}>
                      Segurança Total
                    </h5>
                    <p className="text-muted mb-0">Proteção avançada de dados com criptografia de nível bancário</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 animate-fade-right">
                <div className="d-flex align-items-start">
                  <div className="flex-shrink-0 me-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#e47b38",
                      }}
                    >
                      <Users size={24} color="white" />
                    </div>
                  </div>
                  <div>
                    <h5 className="fw-bold" style={{ color: "#e47b38" }}>
                      Suporte Especializado
                    </h5>
                    <p className="text-muted mb-0">Equipe dedicada para auxiliar em todas as etapas da implementação</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-5">
          <div className="container">
            <div className="row justify-content-center text-center mb-5">
              <div className="col-lg-8 animate-fade-up">
                <h2 className="fw-bold mb-3 text-gradient">O que nossos clientes dizem</h2>
                <p className="text-muted">Depoimentos de empresas que transformaram seus processos seletivos</p>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-lg-4 col-md-6 animate-fade-left">
                <div className="card h-80 border-0 shadow-sm testimonial-card">
                  <div className="card-body p-4">
                    <div className="mb-3" style={{ display: "flex" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="#e47b38" color="#e47b38" />
                      ))}
                    </div>
                    <p className="card-text text-muted mb-3">
                      "A plataforma revolucionou nossos processos seletivos. Conseguimos reduzir o tempo de contratação
                      em 60% e melhorar significativamente a qualidade dos candidatos selecionados."
                    </p>
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle bg-white bg-opacity-20 p-2 d-flex align-items-center justify-content-center"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <img
                          src="/modelwom1.avif"
                          alt="Twitter logo"
                          className="img-fluid rounded "
                        />
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">Maria Silva</h6>
                        <small className="text-muted">Diretora de RH - TechCorp</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 animate-fade-up">
                <div className="card h-95 border-0 shadow-sm testimonial-card">
                  <div className="card-body p-4">
                    <div className="mb-3" style={{ display: "flex" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="#e47b38" color="#e47b38" />
                      ))}
                    </div>
                    <p className="card-text text-muted mb-3">
                      "Excelente ferramenta! A automação dos testes e o armazenamento seguro de documentos nos trouxeram
                      muito mais organização e eficiência."
                    </p>
                    <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-white bg-opacity-20 p-2 d-flex align-items-center justify-content-center"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <img
                        src="/model1.avif"
                        alt="Twitter logo"
                        className="img-fluid rounded "
                      />
                    </div>
                      <div>
                        <h6 className="mb-0 fw-bold">João Santos</h6>
                        <small className="text-muted">Gerente de Pessoas - InnovaCorp</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 animate-fade-right">
                <div className="card h-85 border-0 shadow-sm testimonial-card">
                  <div className="card-body p-4">
                    <div className="mb-3" style={{ display: "flex" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="#e47b38" color="#e47b38" />
                      ))}
                    </div>
                    <p className="card-text text-muted mb-3">
                      "O suporte da equipe Reis Office é excepcional. Nos ajudaram em toda a implementação e continuam
                      sempre disponíveis para dúvidas."
                    </p>
                    <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-white bg-opacity-20 p-2 d-flex align-items-center justify-content-center"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <img
                        src="/model2wom.avif"
                        alt="Twitter logo"
                        className="img-fluid rounded "
                      />
                    </div>
                      <div>
                        <h6 className="mb-0 fw-bold">Ana Costa</h6>
                        <small className="text-muted">Coordenadora de RH - GlobalTech</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-8 animate-fade-up">
                <h3 className="fw-bold mb-3 text-gradient">Pronto para transformar seus processos seletivos?</h3>
                <p className="text-muted mb-4">
                  Experimente nossa solução completa e revolucione a gestão de RH da sua empresa.
                </p>
                <button className="btn btn-lg px-4 py-3 fw-bold btn-primary-custom text-white">
                  Entrar no Sistema
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contato" className="gradient-bg text-white py-5 mt-auto">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <h5 className="fw-bold mb-3">Reis Office</h5>
                <p className="mb-3">
                  Soluções inovadoras em automação de processos seletivos para empresas que buscam excelência em gestão
                  de recursos humanos.
                </p>
                <div className="d-flex gap-3">
                  <a href="https://br.linkedin.com/company/reisoffice" target="_blank" >
                    <div
                      className="rounded-circle bg-white bg-opacity-20 p-2 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <img
                        src="/linkedin.png"
                        alt="Linkedin logo"
                        className="img-fluid rounded "
                      />
                    </div>
                  </a>
                  <a href="https://x.com/reisofficereal" target="_blank" >
                    <div
                      className="rounded-circle bg-white bg-opacity-20 p-2 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <img
                        src="/twitterlogo.svg"
                        alt="Twitter logo"
                        className="img-fluid rounded "
                      />
                    </div>
                  </a>
                  <a href="https://br.linkedin.com/company/reisoffice" target="_blank" >
                    <div
                      className="rounded-circle bg-white bg-opacity-20 p-2 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <img
                        src="/facebook.png"
                        alt="Facebook logo"
                        className="img-fluid rounded "
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <h6 className="fw-bold mb-3">Soluções</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a href="#" className="text-white text-decoration-none opacity-75">
                      Testes Online
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white text-decoration-none opacity-75">
                      Envio de Manuais
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white text-decoration-none opacity-75">
                      Armazenamento
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white text-decoration-none opacity-75">
                      Relatórios
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6">
                <h6 className="fw-bold mb-3">Empresa</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a href="#" className="text-white text-decoration-none opacity-75">
                      Sobre Nós
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white text-decoration-none opacity-75">
                      Carreiras
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white text-decoration-none opacity-75">
                      Blog
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white text-decoration-none opacity-75">
                      Parceiros
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-6">
                <h6 className="fw-bold mb-3">Contato</h6>
                <div className="d-flex align-items-center mb-2">
                  <Phone size={16} className="me-2" />
                  <span>(11) 3456-7890</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Mail size={16} className="me-2" />
                  <span>contato@reisoffice.com.br</span>
                </div>
                <div className="d-flex align-items-start mb-3">
                  <MapPin size={16} className="me-2 mt-1" />
                  <span>
                    Av. Paulista, 1000 - São Paulo, SP
                    <br />
                    CEP: 01310-100
                  </span>
                </div>
                <div className="border-top border-white border-opacity-20 pt-3">
                  <small className="opacity-75">
                    Horário de Atendimento:
                    <br />
                    Segunda a Sexta: 8h às 18h
                  </small>
                </div>
              </div>
            </div>
            <hr className="border-white border-opacity-20 my-4" />
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="mb-0 opacity-75">© 2024 Reis Office. Todos os direitos reservados.</p>
              </div>
              <div className="col-md-6 text-md-end">
                <a href="#" className="text-white text-decoration-none opacity-75 me-3">
                  Política de Privacidade
                </a>
                <a href="#" className="text-white text-decoration-none opacity-75">
                  Termos de Uso
                </a>
              </div>
            </div>
          </div>
        </footer >
        <button
          className={`scroll-to-top ${showScrollTop ? "show" : ""}`}
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
        >
          ↑
        </button>
      </div >

      {/* Bootstrap JS */}
      < script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" ></script >
    </>
  )
}
