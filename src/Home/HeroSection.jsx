import { ChevronLeft, ChevronRight, Clock, Shield, ShoppingBag, Truck } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme(); // Access the current theme dynamically

  const slides = [
    {
      title: 'Best Furniture Collection For Your Interior.',
      discount: '54%',
      image: 'https://picsum.photos/id/101/800/500',
      link: '/shop',
    },
    {
      title: 'Elevate Your Living Space with Our Furniture',
      discount: '30%',
      image: 'https://picsum.photos/id/102/800/500',
      link: '/shop',
    },
    {
      title: 'Stylish and Comfortable Furniture Designs',
      discount: '40%',
      image: 'https://picsum.photos/id/103/800/500',
      link: '/shop',
    },
  ];

  const features = [
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: 'Discount',
      description: 'Every week new sales',
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Free Delivery',
      description: '100% Free for all orders',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Great Support 24/7',
      description: 'We care about experience',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Payment',
      description: '100% Secure Payment Method',
    },
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <>
      {/* Hero Section */}
      <div className={`relative w-full h-[500px] overflow-hidden rounded-3xl ${theme.background} mb-8 mt-2`}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 transform ${
              index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
            }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 ${theme.background}/50`} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <h2 className={`text-4xl font-bold mb-6 max-w-2xl ${theme.text}`}>{slide.title}</h2>
              <div className="flex items-center justify-center gap-4">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${theme.button}`}>
                  {slide.discount} Discount
                </span>
                <Link
                  to={slide.link}
                  className={`px-6 py-2 rounded-full text-sm font-medium ${theme.button} transition-colors duration-300`}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className={`absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full shadow-md ${theme.card}`}
        >
          <ChevronLeft className={`w-6 h-6 ${theme.text}`} />
        </button>
        <button
          onClick={nextSlide}
          className={`absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full shadow-md ${theme.card}`}
        >
          <ChevronRight className={`w-6 h-6 ${theme.text}`} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentSlide ? theme.primary : `${theme.card} opacity-50`
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className={`${theme.background} rounded-xl ${theme.shadow} p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4`}>
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className={`${theme.accent}`}>{feature.icon}</div>
            <div>
              <h3 className={`font-semibold ${theme.text}`}>{feature.title}</h3>
              <p className={`text-sm ${theme.subtext}`}>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HeroSection;
