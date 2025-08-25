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

// Define as props que o componente vai receber
interface MarketingDashboardProps {
  performanceData: PerformanceData[];
}

export function MarketingDashboard({ performanceData }: MarketingDashboardProps) {
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

// --- FUNÇÃO PARA BUSCAR DADOS DO SUPABASE ---
export async function getServerSideProps() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or Key is not defined in .env.local");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('desempenho_ads')
    .select('*')
    .order('data', { ascending: false });

  if (error) {
    console.error('Erro ao buscar dados do Supabase:', error);
    return { props: { performanceData: [] } };
  }

  return {
    props: {
      performanceData: data,
    },
  };
}