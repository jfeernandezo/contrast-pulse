import { useState, useEffect } from "react";
import { TrendingUp, DollarSign, Target, CreditCard } from "lucide-react";
import { KpiCard } from "./KpiCard";
import { DashboardChart } from "./DashboardChart";
import { DataTable } from "./DataTable";
import { DateRangePicker } from "./DateRangePicker";
import { createClient } from '@supabase/supabase-js';

// Define a interface para os dados de performance
interface PerformanceData {
  id: number;
  data: string;
  valor_usado: number;
  cliques: number;
  conversoes: number;
  custo_clique: number;
  custo_conversao: number;
  valor_conversao: number;
  ticket_medio: number;
  roas: number;
  taxa_conversao: string;
}

export function MarketingDashboard() {
  // --- Estado para armazenar os dados e o status de carregamento ---
  const [performanceData, setPerformanceData] = useState<PerformanceData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Hook para buscar os dados quando o componente carregar ---
  useEffect(() => {
    const fetchPerformanceData = async () => {
      // LEITURA CORRETA DAS VARIÁVEIS DE AMBIENTE COM VITE
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        setError("As chaves de acesso ao Supabase não foram encontradas no arquivo .env.local. Verifique se os nomes começam com VITE_");
        setIsLoading(false);
        return;
      }
      
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data, error } = await supabase
        .from('desempenho_ads')
        .select('*')
        .order('data', { ascending: false });

      if (error) {
        console.error("Erro ao buscar dados do Supabase:", error);
        setError("Falha ao carregar os dados.");
      } else {
        setPerformanceData(data);
      }
      
      setIsLoading(false);
    };

    fetchPerformanceData();
  }, []); // O array vazio [] faz com que isso rode apenas uma vez

  // --- Lógica de Renderização ---
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Carregando dados...</p>
      </div>
    );
  }

  if (error || !performanceData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive">{error || "Nenhum dado encontrado."}</p>
      </div>
    );
  }
  
  // --- Lógica para calcular os totais para os KPI Cards ---
  const totalValorConversao = performanceData.reduce((acc, item) => acc + item.valor_conversao, 0);
  const totalValorInvestido = performanceData.reduce((acc, item) => acc + item.valor_usado, 0);
  const totalConversoes = performanceData.reduce((acc, item) => acc + item.conversoes, 0);
  const roasGeral = totalValorInvestido > 0 ? (totalValorConversao / totalValorInvestido) : 0;

  // Formatação para moeda (BRL)
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold text-foreground">
              Dashboard de Performance de Anúncios
            </h1>
            <DateRangePicker />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* KPI Cards com dados dinâmicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title="Valor de Conversão (R$)"
            value={formatCurrency(totalValorConversao)}
            icon={DollarSign}
          />
          <KpiCard
            title="ROAS"
            value={roasGeral.toFixed(2).replace('.', ',')}
            icon={TrendingUp}
          />
          <KpiCard
            title="Total de Conversões"
            value={totalConversoes.toString()}
            icon={Target}
          />
          <KpiCard
            title="Valor Investido (R$)"
            value={formatCurrency(totalValorInvestido)}
            icon={CreditCard}
          />
        </div>

        {/* Gráfico recebendo os dados dinâmicos */}
        <DashboardChart performanceData={performanceData} />

        {/* Tabela recebendo os dados dinâmicos */}
        <DataTable performanceData={performanceData} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-16">
        <div className="container mx-auto px-6 py-6">
          <p className="text-center text-sm text-foreground/50">
            feito por Agência Contrast
          </p>
        </div>
      </footer>
    </div>
  );
}