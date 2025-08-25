import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Define a interface para os dados que o componente espera receber
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

// Define as props do componente
interface DashboardChartProps {
  performanceData: PerformanceData[];
}

// --- Componentes de Tooltip (dica de ferramenta) para os gráficos ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <p className="text-foreground font-medium">{label ? `Data: ${label}` : ""}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {`${entry.name}: ${entry.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <p className="text-foreground font-medium">{payload[0].name}</p>
        <p style={{ color: payload[0].payload.fill }} className="text-sm">
          {`Valor: ${payload[0].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
        </p>
      </div>
    );
  }
  return null;
};


export function DashboardChart({ performanceData }: DashboardChartProps) {
  // --- Lógica para transformar os dados para os formatos dos gráficos ---

  // 1. Dados para o Gráfico de Barras (BarChart)
  // Invertemos o array para mostrar as datas mais antigas primeiro
  const barChartData = performanceData.map(item => ({
    date: new Intl.DateTimeFormat('pt-BR').format(new Date(item.data)),
    valorConversao: item.valor_conversao,
    custoConversao: item.custo_conversao,
    custoClique: item.custo_clique,
  })).reverse();

  // 2. Dados para o Gráfico de Pizza (PieChart)
  // Somamos os totais
  const totalValorConversao = performanceData.reduce((acc, item) => acc + item.valor_conversao, 0);
  const totalCustoConversao = performanceData.reduce((acc, item) => acc + item.custo_conversao, 0);
  const totalValorInvestido = performanceData.reduce((acc, item) => acc + item.valor_usado, 0);

  const pieChartData = [
    { name: "Valor Investido", value: totalValorInvestido, fill: "hsl(var(--chart-primary))" },
    { name: "Custo por Conversão (Total)", value: totalCustoConversao, fill: "hsl(var(--chart-secondary))" },
    { name: "Valor da Conversão (Total)", value: totalValorConversao, fill: "hsl(var(--chart-accent))" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Pizza com dados dinâmicos */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-[var(--shadow-card)]">
        <h3 className="text-xl font-semibold mb-6 text-foreground">
          Distribuição de Custos e Valores
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Colunas com dados dinâmicos */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-[var(--shadow-card)]">
        <h3 className="text-xl font-semibold mb-6 text-foreground">
          Métricas por Período
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--foreground))"
                fontSize={12}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="custoClique"
                fill="hsl(var(--chart-primary))"
                name="Custo por Clique"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="custoConversao"
                fill="hsl(var(--chart-secondary))"
                name="Custo por Conversão"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="valorConversao"
                fill="hsl(var(--chart-accent))"
                name="Valor da Conversão"
                radius={[2, 2, 0, 0]}
              /> 