import { Droplet, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-blue-600 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About */}
          <div className="mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Droplet className="h-6 w-6" />
              <span className="text-xl font-bold">AquaWell</span>
            </div>
            <p className="text-blue-200 text-sm">
              Your trusted water refilling station providing premium purified and alkaline water for your health and wellness.
            </p>
          </div>

          {/* Quick Links */}
          <div className="ml-6">
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mx-auto">
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-blue-200 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Upper Ground Floor Unit B Fullerton Suites 1, Silang, Philippines, 4118</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>0998-765-4321</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@aquawell.com</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="mx-auto">
            <h3 className="font-bold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>Monday - Friday: 7:00 AM - 7:00 PM</li>
              <li>Saturday: 8:00 AM - 6:00 PM</li>
              <li>Sunday: 9:00 AM - 5:00 PM</li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-blue-200 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200 text-sm">
          <p>&copy; {new Date().getFullYear()} AquaWell Water Refilling Station. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
