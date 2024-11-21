import { ChevronLeft, ChevronRight, Clock, Shield, ShoppingBag, Truck } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const slides = [
    {
      title: 'Best Furniture Collection For Your Interior.',
      discount: '54%',
      image: 'https://picsum.photos/id/101/800/500',
      link: '/shop'
    },
    {
      title: 'Elevate Your Living Space with Our Furniture',
      discount: '30%',
      image: 'https://picsum.photos/id/101/800/500',
      link: '/shop'
    },
    {
      title: 'Stylish and Comfortable Furniture Designs',
      discount: '40%',
      image: 'https://picsum.photos/id/101/800/500',
      link: '/shop'
    }
  ];

  const features = [
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: 'Discount',
      description: 'Every week new sales'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Free Delivery',
      description: '100% Free for all orders'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Great Support 24/7',
      description: 'We care about experience'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Payment',
      description: '100% Secure Payment Method'
    }
  ];


  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };
  return (
   <>
    <div className="relative w-full h-[500px] overflow-hidden rounded-3xl bg-sage-100 mb-8 mt-2">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 transform ${
            index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <p className="text-sm font-medium mb-2">{slide.subtitle}</p>
            <h2 className="text-4xl font-bold mb-6 max-w-2xl">{slide.title}</h2>
            <div className="flex items-center justify-center gap-4">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                {slide.discount} Discount
              </span>
              <Link
                to={slide.link}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={prevSlide}
        className={`absolute top-1/2 left-4 -translate-y-1/2 ${theme.background}/70  rounded-full p-2 shadow-md `}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className={`absolute top-1/2 right-4 -translate-y-1/2 ${theme.background}/70  rounded-full p-2 shadow-md `}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>

    {/* Features Section */}
    <div className={`${theme.background} border-[${theme.outer_border}] rounded-xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4`}>
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className={`${theme.text}`}>
            {feature.icon}
          </div>
          <div>
            <h3 className={`font-semibold ${theme.text}`}>{feature.title}</h3>
            <p className={`text-sm ${theme.text}`}>{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default HeroSection