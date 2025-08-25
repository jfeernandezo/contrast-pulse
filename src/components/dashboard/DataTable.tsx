import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const tableData = [
  {
    data: "15/06/2024",
    valorUsado: 189.50,
    cliques: 142,
    conversoes: 8,
    custoPorClique: 1.33,
    custoPorConversao: 23.69,
    valorConversao: 850.00,
    ticketMedio: 106.25,
    roas: 4.48,
    taxaConversao: 5.63
  },
  {
    data: "16/08/2024",
    valorUsado: 245.80,
    cliques: 189,
    conversoes: 12,
    custoPorClique: 1.30,
    custoPorConversao: 20.48,
    valorConversao: 1200.00,
    ticketMedio: 100.00,
    roas: 4.88,
    taxaConversao: 6.35
  },
  {
    data: "17/08/2024",
    valorUsado: 198.20,
    cliques: 156,
    conversoes: 9,
    custoPorClique: 1.27,
    custoPorConversao: 22.02,
    valorConversao: 980.00,
    ticketMedio: 108.89,
    roas: 4.94,
    taxaConversao: 5.77
  },
  {
    data: "24/08/2024",
    valorUsado: 312.45,
    cliques: 234,
    conversoes: 18,
    custoPorClique: 1.34,
    custoPorConversao: 17.36,
    valorConversao: 1500.00,
    ticketMedio: 83.33,
    roas: 4.80,
    taxaConversao: 7.69
  },
  {
    data: "25/08/2024",
    valorUsado: 278.90,
    cliques: 203,
    conversoes: 15,
    custoPorClique: 1.37,
    custoPorConversao: 18.59,
    valorConversao: 1320.00,
    ticketMedio: 88.00,
    roas: 4.73,
    taxaConversao: 7.39
  }
];

export function DataTable() {
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
            {tableData.map((row, index) => (
              <TableRow key={index} className="border-border hover:bg-secondary/50 transition-colors">
                <TableCell className="text-foreground">{row.data}</TableCell>
                <TableCell className="text-foreground">
                  R$ {row.valorUsado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-foreground">{row.cliques.toLocaleString('pt-BR')}</TableCell>
                <TableCell className="text-primary font-medium">{row.conversoes}</TableCell>
                <TableCell className="text-foreground">
                  R$ {row.custoPorClique.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-foreground">
                  R$ {row.custoPorConversao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-primary font-medium">
                  R$ {row.valorConversao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-foreground">
                  R$ {row.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-primary font-medium">{row.roas.toFixed(2)}</TableCell>
                <TableCell className="text-foreground">{row.taxaConversao.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}