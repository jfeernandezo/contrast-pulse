import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const chartData = [
  { date: "15/06", valorConversao: 850, custoConversao: 120 },
  { date: "16/08", valorConversao: 1200, custoConversao: 180 },
  { date: "17/08", valorConversao: 980, custoConversao: 140 },
  { date: "24/08", valorConversao: 1500, custoConversao: 200 },
  { date: "25/08", valorConversao: 1320, custoConversao: 165 },
  { date: "26/08", valorConversao: 1680, custoConversao: 190 },
  { date: "27/08", valorConversao: 1420, custoConversao: 175 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <p className="text-foreground font-medium">{`Data: ${label}`}</p>
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

export function DashboardChart() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-[var(--shadow-card)]">
      <h3 className="text-xl font-semibold mb-6 text-foreground">
        Valor de Conversão (R$) vs. Custo por Conversão (R$)
      </h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            <Line
              type="monotone"
              dataKey="valorConversao"
              stroke="hsl(var(--chart-primary))"
              strokeWidth={3}
              name="Valor de Conversão"
              dot={{ fill: "hsl(var(--chart-primary))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--chart-primary))", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="custoConversao"
              stroke="hsl(var(--chart-secondary))"
              strokeWidth={3}
              name="Custo por Conversão"
              dot={{ fill: "hsl(var(--chart-secondary))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--chart-secondary))", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}