import {Link} from "react-router-dom"
import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
// import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-200 text-muted-foreground">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-neutral-content">Wypp</h3>
            <p className="text-sm">Connecting college students across campuses. Share, learn, and grow together.</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-neutral-content">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-neutral-content transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-neutral-content transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-neutral-content transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-neutral-content transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-neutral-content">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="amarrajput2006@gmail.com" className="hover:text-neutral-content transition-colors">
                  amarrajput2006@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 800 699...</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Mathura , India</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-neutral-content">Connect with Me</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="https://twitter.com/amarlodhi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-neutral-content transition-colors"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </a>
              <a
                href="https://linkedin.com/in/amarlodhi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-neutral-content transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/amarlodhi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-neutral-content transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://instagram.com/amarlodhi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-neutral-content transition-colors"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
              <a
                href="https://facebook.com/amarlodhi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-neutral-content transition-colors"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className=" w-full h-[1px] bg-black"></div>

        {/* Copyright */}
        <div className="text-center text-sm">
          <p>
            © {new Date().getFullYear()} Wypp. Designed & Developed by{" "}
            <a
              href="https://amarlodhi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-content hover:underline"
            >
              Amar Lodhi
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

