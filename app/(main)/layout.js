
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <main className="flex flex-1 flex-col">
        {children}
      </main>

      <Footer />
    </div>
  );
}
