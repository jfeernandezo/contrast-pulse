import { TrendingUp, DollarSign, Target, CreditCard } from "lucide-react";
import { KpiCard } from "./KpiCard";
import { DashboardChart } from "./DashboardChart";
import { DataTable } from "./DataTable";
import { DateRangePicker } from "./DateRangePicker";

export function MarketingDashboard() {
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
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title="Valor de Conversão (R$)"
            value="R$ 9.480,00"
            icon={DollarSign}
          />
          <KpiCard
            title="ROAS"
            value="7,11"
            icon={TrendingUp}
          />
          <KpiCard
            title="Total de Conversões"
            value="171"
            icon={Target}
          />
          <KpiCard
            title="Valor Investido (R$)"
            value="R$ 1.332,22"
            icon={CreditCard}
          />
        </div>

        {/* Chart */}
        <DashboardChart />

        {/* Data Table */}
        <DataTable />
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