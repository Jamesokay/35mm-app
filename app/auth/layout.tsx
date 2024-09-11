export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex w-full h-[100dvh]">{children}</main>;
}
