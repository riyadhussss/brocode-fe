import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface CapsterStatsProps {
  totalCapsters: number;
  activeCapsters: number;
}

export function CapsterStats({
  totalCapsters,
  activeCapsters,
}: CapsterStatsProps) {
  const inactiveCapsters = totalCapsters - activeCapsters;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 flex-shrink-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Capster</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCapsters}</div>
          <p className="text-xs text-muted-foreground">Capster terdaftar</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Capster Aktif</CardTitle>
          <Users className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {activeCapsters}
          </div>
          <p className="text-xs text-muted-foreground">Capster yang aktif</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Capster Tidak Aktif
          </CardTitle>
          <Users className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {inactiveCapsters}
          </div>
          <p className="text-xs text-muted-foreground">Capster tidak aktif</p>
        </CardContent>
      </Card>
    </div>
  );
}
