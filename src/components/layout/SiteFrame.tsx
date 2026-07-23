export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh overflow-x-clip bg-crema text-texto">
      {children}
    </div>
  );
}
