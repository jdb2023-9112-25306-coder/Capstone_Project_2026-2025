import { Link } from "react-router";
import {
  Droplet,
  Truck,
  ShieldCheck,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Home() {
  return (
     <div className="min-h-screen bg-gray-50">
       
      {/* Hero Section */}
       <section className="bg-blue-600 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl md:text-5xl lg:text-6xl font-bold mb-4">
                Pure Water, Delivered Fresh
              </h1>
              <p className="text-2xl md:text-2xl text-white-800 mb-6">
                Premium purified and alkaline water for your
                home and office.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/services">
                  <Button
                    size="lg"
                    variant="secondary"
                     className="bg-white text-black hover:bg-gray-200"
                  >
                    Order Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <ImageWithFallback
                src="https://i.pinimg.com/1200x/83/49/8d/83498da1384ba6032de2dd2523dbcf7d.jpg"
                alt="Pure Water"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-30 py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-3xl md-text-lg text-black mx-auto font-bold">
              Why choose AquaTrack?
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide the highest quality water refilling
              services with convenience and reliability.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplet className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">
                  Premium Quality
                </h3>
                <p className="text-gray-600 text-sm">
                  Advanced filtration and purification systems
                  ensuring the cleanest water.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">
                  Fast Delivery
                </h3>
                <p className="text-gray-600 text-sm">
                  Quick and reliable delivery service straight
                  to your door.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">
                  Safety First
                </h3>
                <p className="text-gray-600 text-sm">
                  Rigorous quality control and safety standards
                  for your peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">
                  24/7 Support
                </h3>
                <p className="text-gray-600 text-sm">
                  Round-the-clock customer support for your
                  convenience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
       <section className="bg-blue-600 text-white py-13 mt-30 md:py-20">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-4xl font-bold mb-5">
            Ready to Order?
          </h2>
          <p className="text-lg  mb-8 max-w-2xl mx-auto">
            Start enjoying premium quality water today. Create
            an account and place your first order!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                variant="outline"
                 className="bg-white text-black hover:bg-gray-200"
              >
                Get Started
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                 className="bg-white text-black hover:bg-gray-200"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <div className="mt-90 mx-auto bg-white"></div>
    </div>
  );
}