import { Box, CreditCard, MessageCircle, Truck } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full px-4 lg:px-8 border-t bg-accent">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-b">
        <div className="flex items-center gap-3">
          <MessageCircle className="shrink-0" />
          <div>
            <h1 className="text-lg font-['Times_New_Roman',_serif] leading-tight">Customer Service</h1>
            <p className="text-muted-foreground text-sm">Contact us easily</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Truck className="shrink-0" />
          <div>
            <h1 className="text-lg font-['Times_New_Roman',_serif] leading-tight">Fast Delivery</h1>
            <p className="text-muted-foreground text-sm">Global shipping</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CreditCard className="shrink-0" />
          <div>
            <h1 className="text-lg font-['Times_New_Roman',_serif] leading-tight">Secure Payment</h1>
            <p className="text-muted-foreground text-sm">100% safe checkout</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Box className="shrink-0" />
          <div>
            <h1 className="text-lg font-['Times_New_Roman',_serif] leading-tight">Easy Return</h1>
            <p className="text-muted-foreground text-sm">30-day guarantee</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8">    
        <div className="space-y-2 col-span-1">
          <p className="font-bold">Logo</p>
          <p className="text-sm text-muted-foreground">High-quality craft supplies for your next big project.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
          <div>
            <h3 className="font-medium mb-3 font-sans text-base">Navigations</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>Furniture</li>
              <li>Favorites</li>
              <li>Cart</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-3 font-sans text-base">Need help?</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>Help and contact</li>
              <li>My orders</li>
              <li>My account</li>
              <li>Terms and conditions</li>
              <li>Privacy policy</li>
            </ul>
          </div>
        </div>

        <div className="col-span-1">
          <h3 className="font-medium mb-3 font-sans text-base">Follow us</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <FaFacebook/>
              <h1>Facebook</h1>
            </div>

             <div className="flex items-center gap-3 text-muted-foreground">
              <FaInstagram/>
              <h1>Instagram</h1>
            </div>

             <div className="flex items-center gap-3 text-muted-foreground">
              <FaTiktok/>
              <h1>Tiktok</h1>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}