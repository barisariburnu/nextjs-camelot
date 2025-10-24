export default function NotFoundPage() {
  return (
    <html>
      <body>
        <div style={{ padding: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600 }}>Sayfa bulunamadı</h1>
          <p style={{ marginTop: 8 }}>
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
          <a href="/" style={{ marginTop: 16, display: "inline-block" }}>Ana sayfaya dön</a>
        </div>
      </body>
    </html>
  );
}