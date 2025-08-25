import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

export function KpiCard({ title, value, icon: Icon }: KpiCardProps) {
  return (
    <Card className="p-6 border border-border bg-gradient-to-br from-secondary to-card shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-accent)]">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon className="h-4 w-4" />
            {title}
          </div>
          <div className="text-2xl font-bold text-primary">
            {value}
          </div>
        </div>
      </div>
    </Card>
  );
}