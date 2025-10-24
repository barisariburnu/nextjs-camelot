import ClientPage from "./ClientPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: "1" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClientPage params={{ id }} />;
}
