"use client";

import * as React from "react";
import { Button } from "@workspace/ui/components/button";
import { FileText } from "lucide-react";

export default function Notes() {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Notlar</h3>
        <p className="text-muted-foreground mb-4">Eşleşen kayıt bulunamadı.</p>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          Yeni Not
        </Button>
      </div>
    </div>
  );
}