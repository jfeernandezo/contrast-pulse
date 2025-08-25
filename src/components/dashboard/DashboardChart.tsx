import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const chartData = [
  { date: "15/06", valorConversao: 850, custoConversao: 120, custoClique: 45 },
  { date: "16/08", valorConversao: 1200, custoConversao: 180, custoClique: 62 },
  { date: "17/08", valorConversao: 980, custoConversao: 140, custoClique: 38 },
  { date: "24/08", valorConversao: 1500, custoConversao: 200, custoClique: 75 },
  { date: "25/08", valorConversao: 1320, custoConversao: 165, custoClique: 58 },
  { date: "26/08", valorConversao: 1680, custoConversao: 190, custoClique: 82 },
  { date: "27/08", valorConversao: 1420, custoConversao: 175, custoClique: 66 },
];

const pieData = [
  { name: "Custo por Clique", value: 426, fill: "hsl(var(--chart-primary))" },
  { name: "Custo por Conversão", value: 1170, fill: "hsl(var(--chart-secondary))" },
  { name: "Valor da Conversão", value: 8850, fill: "hsl(var(--chart-accent))" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <p className="text-foreground font-medium">{label ? `Data: ${label}` : ""}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {`${entry.name}: R$ ${entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
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
        <p style={{ color: payload[0].color }} className="text-sm">
          {`Valor: R$ ${payload[0].value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
        </p>
      </div>
    );
  }
  return null;
};

export function DashboardChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Pizza */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-[var(--shadow-card)]">
        <h3 className="text-xl font-semibold mb-6 text-foreground">
          Distribuição de Custos e Valores
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Colunas */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-[var(--shadow-card)]">
        <h3 className="text-xl font-semibold mb-6 text-foreground">
          Métricas por Período
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}