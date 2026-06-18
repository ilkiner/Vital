// (public) route group — Navbar ve Footer [locale]/layout.tsx'ten miras alınır.
// Bu dosya Next.js route group'u için gereklidir.
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
