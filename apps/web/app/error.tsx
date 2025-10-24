"use client";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-destructive" />
            <CardTitle>Bir hata oluştu</CardTitle>
          </div>
          <CardDescription>
            Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="break-words text-sm text-muted-foreground">
              {error?.message ?? "Bilinmeyen hata"}
            </p>
            <div className="flex gap-2">
              <Button onClick={() => reset()}>Tekrar dene</Button>
              <Button variant="outline" asChild>
                <Link href="/">Ana sayfaya dön</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}