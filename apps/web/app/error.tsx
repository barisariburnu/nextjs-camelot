"use client";

export default function ErrorPage() {
  return (
    <html>
      <body>
        <div style={{ padding: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600 }}>Bir hata oluştu</h1>
          <p style={{ marginTop: 8 }}>Beklenmeyen bir hata oluştu.</p>
          <a href="/" style={{ marginTop: 16, display: "inline-block" }}>Ana sayfaya dön</a>
        </div>
      </body>
    </html>
  );
}