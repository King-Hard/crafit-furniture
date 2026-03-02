import { Box, CreditCard, MessageCircle, Truck } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-accent">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-foreground/10">
          <Feature icon={<MessageCircle />} title="Customer Service" desc="Contact us easily" />
          <Feature icon={<Truck />} title="Fast Delivery" desc="Baliuag City or Pampanga" />
          <Feature icon={<CreditCard />} title="Secure Payment" desc="100% safe checkout" />
          <Feature icon={<Box />} title="Easy Return" desc="15-day guarantee" />
        </section>

        <section className="py-16 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-dashed border-foreground/20">
          <div className="space-y-4">
            <p className="text-xl tracking-[0.3em] font-black uppercase font-sans">Craftit</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Is an all-in-one source for high-quality artisan furniture and customized woodworks. Design for the home and comfort of Filipinos.
            </p>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <FooterLinkGroup title="Navigations" links={[
              { label: "Craftit", href: "/" },
              { label: "Furniture", href: "/furniture" },
              { label: "Favorites", href: "/favorites" },
              { label: "Cart", href: "/cart" }
            ]} />
            <FooterLinkGroup title="Need Help?" links={[
              { label: "Help & Contact", href: "#" },
              {label: "My Orders", href: "#" },
              { label: "Delivery & Returns", href: "#" },
              { label: "FAQs", href: "#" },
            ]} />
            <div className="space-y-4">
              <h1 className="font-bold text-sm uppercase tracking-widest font-sans">Follow Us</h1>
              <div className="flex gap-6 text-muted-foreground">
                <Link href="https://www.facebook.com/" target="_blank" className="hover:text-foreground transition-colors"><FaFacebook size={20} /></Link>
                <Link href="https://www.instagram.com/" target="_blank" className="hover:text-foreground transition-colors"><FaInstagram size={20} /></Link>
                <Link href="https://www.tiktok.com/" target="_blank" className="hover:text-foreground transition-colors"><FaTiktok size={20} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground font-medium">
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Terms & Conditons</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy & Policy</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} Craftit. All Rights Reserved.</p>
        </section>
      </div>
    </footer>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="shrink-0 text-foreground/70">{icon}</div>
      <div>
        <h1 className="text-sm font-bold uppercase tracking-wider font-sans leading-tight">{title}</h1>
        <p className="text-muted-foreground font-medium text-[11px] uppercase tracking-tight">{desc}</p>
      </div>
    </div>
  );
}

function FooterLinkGroup({ title, links }: { title: string, links: { label: string, href: string }[] }) {
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-sm uppercase tracking-widest font-sans">{title}</h1>
      <ul className="text-sm space-y-2 text-muted-foreground">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="hover:text-foreground transition-all flex items-center gap-1 group">
              <span className="h-[1px] w-0 bg-foreground group-hover:w-2 transition-all duration-300" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}