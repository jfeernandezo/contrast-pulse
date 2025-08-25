import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
interface DataTableProps {
  performanceData: PerformanceData[];
}

export function DataTable({ performanceData }: DataTableProps) {
  // Função para formatar a data para o padrão brasileiro (dd/mm/yyyy)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Adiciona o fuso horário para evitar problemas de um dia a menos
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-[var(--shadow-card)]">
      <h3 className="text-xl font-semibold mb-6 text-foreground">
        Dados Detalhados de Performance
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-foreground font-medium">Data</TableHead>
              <TableHead className="text-foreground font-medium">Valor Usado (R$)</TableHead>
              <TableHead className="text-foreground font-medium">Cliques</TableHead>
              <TableHead className="text-foreground font-medium">Conversões</TableHead>
              <TableHead className="text-foreground font-medium">Custo por Clique (R$)</TableHead>
              <TableHead className="text-foreground font-medium">Custo por Conversão (R$)</TableHead>
              <TableHead className="text-foreground font-medium">Valor de Conversão (R$)</TableHead>
              <TableHead className="text-foreground font-medium">Ticket Médio (R$)</TableHead>
              <TableHead className="text-foreground font-medium">ROAS</TableHead>
              <TableHead className="text-foreground font-medium">Taxa de Conversão</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Usando os dados dinâmicos recebidos via props */}
            {performanceData.map((row) => (
              <TableRow key={row.id} className="border-border hover:bg-secondary/50 transition-colors">
                <TableCell className="text-foreground">{formatDate(row.data)}</TableCell>
                <TableCell className="text-foreground">
                  {row.valor_usado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </TableCell>
                <TableCell className="text-foreground">{row.cliques.toLocaleString('pt-BR')}</TableCell>
                <TableCell className="text-primary font-medium">{row.conversoes}</TableCell>
                <TableCell className="text-foreground">
                  {row.custo_clique.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </TableCell>
                <TableCell className="text-foreground">
                  {row.custo_conversao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </TableCell>
                <TableCell className="text-primary font-medium">
                  {row.valor_conversao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </TableCell>
                <TableCell className="text-foreground">
                  {row.ticket_medio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </TableCell>
                <TableCell className="text-primary font-medium">{row.roas.toFixed(2)}</TableCell>
                <TableCell className="text-foreground">{row.taxa_conversao}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}