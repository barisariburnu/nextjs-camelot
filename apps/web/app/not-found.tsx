import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="size-5 text-muted-foreground" />
            <CardTitle>Sayfa bulunamadı</CardTitle>
          </div>
          <CardDescription>
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" asChild>
            <Link href="/">Ana sayfaya dön</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}