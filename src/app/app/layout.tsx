import TopNav from '@/components/TopNav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-sonic-primary/30">
      <TopNav />
      {/* 
        The top nav is 80px high (h-20). We pad the top of the main content 
        to ensure it slides under the nav appropriately but doesn't overlap text.
      */}
      <main className="pt-20 min-h-screen">
        {children}
      </main>
    </div>
  );
}
