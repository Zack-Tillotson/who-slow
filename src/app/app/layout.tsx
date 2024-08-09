import {Dashboard} from '@/views/dashboard'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Dashboard>
      {children}
    </Dashboard>
  );
}
