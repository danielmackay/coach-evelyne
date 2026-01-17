import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"
import { siteConfig } from "@/lib/config"

const socialLinks:any[] = [
  // { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  // { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  // { icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
  // { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
]

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  // { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold mb-4 inline-block">
              {siteConfig.name}
            </Link>
            <p className="text-background/70 max-w-md mb-6">
              Helping you build strength, improve mobility, and move better. Qualified personal trainer offering personalized in-person training in Coolum and the Sunshine Coast.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-background/70">
              <li>
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-background transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-background transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>{siteConfig.contact.location}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          {/* <div className="flex gap-6 text-sm">
            <Link href="#" className="text-background/60 hover:text-background transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-background/60 hover:text-background transition-colors">
              Terms of Service
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
