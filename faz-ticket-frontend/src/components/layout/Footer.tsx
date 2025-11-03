import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">FAZ E-Tickets</h3>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Official ticketing platform for the Football Association of Zambia. Secure, fast, and trusted.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-primary-foreground/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-primary-foreground/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-primary-foreground/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-primary-foreground/10">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/matches" className="hover:text-accent transition-colors">
                  Browse Matches
                </Link>
              </li>
              <li>
                <Link to="/teams" className="hover:text-accent transition-colors">
                  Teams & Stadiums
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-accent transition-colors">
                  Help & FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help/buying" className="hover:text-accent transition-colors">
                  How to Buy Tickets
                </Link>
              </li>
              <li>
                <Link to="/help/payment" className="hover:text-accent transition-colors">
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link to="/help/safety" className="hover:text-accent transition-colors">
                  Safety & Security
                </Link>
              </li>
              <li>
                <Link to="/legal/terms" className="hover:text-accent transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Get match alerts and exclusive offers
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="accent" size="sm" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-primary-foreground/20 pt-6 mb-6">
          <p className="text-sm text-primary-foreground/80 mb-3">Accepted Payment Methods:</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="px-4 py-2 bg-primary-foreground/10 rounded text-sm font-semibold">
              MTN MoMo
            </div>
            <div className="px-4 py-2 bg-primary-foreground/10 rounded text-sm font-semibold">
              Airtel Money
            </div>
            <div className="px-4 py-2 bg-primary-foreground/10 rounded text-sm font-semibold">
              Zamtel Money
            </div>
            <div className="px-4 py-2 bg-primary-foreground/10 rounded text-sm font-semibold">
              Visa
            </div>
            <div className="px-4 py-2 bg-primary-foreground/10 rounded text-sm font-semibold">
              Mastercard
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/60">
          <p>© 2025 Football Association of Zambia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
