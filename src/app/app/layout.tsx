import {Shell} from '@/components/shell'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <Shell>
      {children}
    </Shell>
  );
}
