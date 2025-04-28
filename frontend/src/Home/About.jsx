import React from 'react';
import './styles.css';
import Header from '../Layout/Header';

export default function About() {
  return (
    <main className="our-story-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-image-container">
          <img 
            src="https://cdn.shopify.com/s/files/1/0123/5065/2473/files/Img1_HeroImage_DK_56955de7-f9fb-4148-9a13-5422b253fa9b.jpg?v=1682445736&format=webp&width=1200&height=1200" 
            alt="Buck Mason: Our Story" 
            className="hero-image" 
          />
        </div>
      </section>

      {/* Brand Intro Section */}
      <section className="content-section">
        <div className="content-block image-right">
          <div className="text-column">
            <h2 className="section-heading">
              Our Story
            </h2>
            <div className="text-content">
              <p>
              It all started with a simple idea shared among three close friends: to create something meaningful and innovative that combines fashion and technology. We noticed a gap in the fashion industry—shopping for clothes often felt impersonal, and finding colors that truly complement one's unique skin tone was a challenge for many.

             </p>
              <p>
              Inspired by this, we decided to build a platform that goes beyond just selling clothes. Our mission became clear: to help people discover outfits and accessories that not only fit them but also celebrate their individuality.
              </p>

              <p>
              What makes us unique is our personalized approach. Using a blend of creativity and technology, we developed a system that suggests clothing and color combinations tailored to each customer’s skin tone. It’s more than just shopping—it’s about empowering you to express yourself with confidence and ease.
              </p>
            
              <p>
              From late-night brainstorming sessions to turning our vision into reality, this journey has been fueled by passion, teamwork, and a shared dream of redefining the shopping experience. Today, we’re proud to bring you a platform that combines style, innovation, and inclusivity.
              <p>
              Welcome to SkinSync—where fashion meets individuality.
              </p>
              
              </p>
            </div>
          </div>
          <div className="image-column">
            <img 
              src="https://cdn.shopify.com/s/files/1/0123/5065/2473/files/Img2_BrandPillars.jpg?v=1682447357&format=webp&width=860&height=860" 
              alt="Buck Mason brand values" 
              className="section-image" 
            />
          </div>
        </div>
      </section>

      {/* Design Philosophy Section */}
      <section className="content-section">
        <div className="content-block">
          <div className="image-column">
            <img 
              src="https://cdn.shopify.com/s/files/1/0123/5065/2473/files/Design.jpg?v=1685482216&format=webp&width=860&height=860" 
              alt="Buck Mason HQ, 2023" 
              className="section-image" 
            />
            <div className="image-caption">Designer Selection, 2024</div>
          </div>
          <div className="text-column">
            <h2 className="section-heading">Design</h2>
            <div className="text-content">
              <p>
              At SkinSync, design isn’t just about aesthetics—it’s about purpose. We’ve crafted a platform where technology and creativity come together to offer personalized clothing suggestions based on skin tone. Every detail, from our intuitive interface to our carefully curated collections, is designed to make your shopping experience seamless, empowering, and uniquely yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Partnerships Section */}
      <section className="content-section">
        <div className="content-block image-right">
          <div className="text-column">
            <h2 className="section-heading">Global Partnerships</h2>
            <div className="text-content">
              <p>
                Our clothes are made in the finest factories in the world, combining innovative technologies with meticulous, hand-crafted quality. Our choice in partnerships, both domestic and overseas, rests on our commitment to that standard of quality. We ensure fair working conditions and equitable pay, helping to create environments conducive to creating the best possible clothing at incredibly fair prices.
              </p>
            </div>
          </div>
          <div className="image-column">
            <img 
              src="https://cdn.shopify.com/s/files/1/0123/5065/2473/files/OurProcess.jpg?v=1685482462&format=webp&width=860&height=860" 
              
              className="section-image" 
            />
            <div className="image-caption">
               
            </div>
          </div>
        </div>
      </section>

      {/* Knitting Mills Feature */}
      <section className="feature-section">
        <a 
          href="/pages/buck-mason-knitting-mills" 
          className="feature-link"
        >
          <div className="feature-content">
            <div className="feature-image-container">
              <img 
                src="https://cdn.shopify.com/s/files/1/0123/5065/2473/files/Mohnton_3.jpg?v=1685559144&format=webp&width=700&height=500  " 
                alt="Buck Mason Knitting Mills" 
                className="feature-image" 
              />
            </div>
            <div className="feature-overlay">
              <div className="overlay-content">
                <h2 className="feature-title">Buck Mason Knitting Mills</h2>
                <p className="feature-description">
                  Inspired Outfits Ideas By Buck Mason Knitting Mills
                </p>
                <div className="feature-cta">
                  <a href="https://www.buckmason.com/pages/buck-mason-knitting-mills" target="_blank">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </a>
      </section>

      {/* Stores Section */}
      <section className="content-section">
        <div className="content-block stores-block">
          <div className="image-column">
            <div className="image-wrapper">
              <img 
                src="https://cdn.shopify.com/s/files/1/0123/5065/2473/files/Mohnton_3.jpg?v=1685559144&format=webp&width=900&height=900" 
                alt="Buck Mason Stores" 
                className="section-image" 
              />
              <div className="image-tag">Our Stores</div>
            </div>
          </div>
          <div className="text-column">
            <h2 className="section-heading">Shop Now</h2>
            <div className="text-content">
              <p>
                We've got great neighbors, classic clothes, and cold drinks up for grabs whenever you wanna stop by. See you soon.
              </p>
              <p>
                <a href="/" className="text-link" target="_blank">
                  <span>Stop on By</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="vision-section">
        <div className="vision-container">
          <h2 className="vision-title">Our Vision</h2>
          <div className="vision-content">
            <p>
            To revolutionize fashion by creating a personalized shopping experience that celebrates individuality, empowers confidence, and makes finding the perfect outfit effortless for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="materials-section">
        <div className="materials-grid">
          <div className="material-card">
            <div className="material-image-container">
              <img 
                src="https://cdn.shopify.com/s/files/1/0123/5065/2473/files/Img3_StoresImg.jpg?v=1682447459&format=webp&width=860&height=860" 
                alt="Premium Cotton" 
                className="material-image" 
              />
            </div>
            <h3 className="material-title">Premium Materials</h3>
            <p className="material-description">
              We source the finest fabrics from around the world, ensuring every piece feels as good as it looks.
            </p>
          </div>
          
          <div className="material-card">
            <div className="material-image-container">
              <img 
                src="https://cdn.shopify.com/s/files/1/0123/5065/2473/files/Mohnton_7.jpg?v=1685559257&format=webp&width=900&height=900" 
                alt="Expert Craftsmanship" 
                className="material-image" 
              />
            </div>
            <h3 className="material-title">Expert Craftsmanship</h3>
            <p className="material-description">
              Each garment is meticulously constructed with attention to every stitch and detail.
            </p>
          </div>
          
          <div className="material-card">
            <div className="material-image-container">
              <img 
                src="https://cdn.shopify.com/s/files/1/0123/5065/2473/files/Mohnton_2.jpg?v=1685559106&format=webp&width=900&height=900" 
                alt="Timeless Design" 
                className="material-image" 
              />
            </div>
            <h3 className="material-title">Timeless Design</h3>
            <p className="material-description">
              We create pieces that transcend trends, designed to be worn and loved for years to come.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}