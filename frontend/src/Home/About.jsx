import React from 'react';
import './styles.css';

export default function OurStory() {
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
          <h1 className="hero-title">Our Story</h1>
        </div>
      </section>

      {/* Brand Intro Section */}
      <section className="content-section">
        <div className="content-block image-right">
          <div className="text-column">
            <h2 className="section-heading">
              Buck Mason makes updated, modern American classics with a commitment to timelessness, quality, and our California roots.
            </h2>
            <div className="text-content">
              <p>
                Founded in 2013 in Venice, California, by Sasha Koehn and Erik Allen Ford, we started out of a 350-square-foot garage with locally-made jeans and tees and a simple goal to make clothing that will stand the test of time.
              </p>
              <p>
                From the start, we've remained committed to quality craftsmanship, combining old-school manufacturing techniques and modern technology to create wardrobe essentials that make it easy to be the best dressed in the room.
              </p>
              <p>
                Each piece in our collection has a little bit of us infused in it; a laidback, effortless style that looks as good as it feels. We call it the spirit of California.
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
            <div className="image-caption">Buck Mason HQ, 2023</div>
          </div>
          <div className="text-column">
            <h2 className="section-heading">Design</h2>
            <div className="text-content">
              <p>
                Our aim is for our clothing to outlive us. Not just in that it lasts a lifetime but that it will stand the test of time. We've dedicated ourselves to crafting garments that are not only impeccably constructed but also timeless in their design. By deconstructing and refining the clothing Americans have worn for generations, we've created modern, elevated classics that we believe you'll reach for time and again.
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
              alt="Manteco Textile Mill, Tuscany" 
              className="section-image" 
            />
            <div className="image-caption">
              <a href="https://manteco.com/" target="_blank" rel="noreferrer">
                Manteco Textile Mill, Tuscany
              </a>
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
                src="/images/knitting-mills.jpg" 
                alt="Buck Mason Knitting Mills" 
                className="feature-image" 
              />
            </div>
            <div className="feature-overlay">
              <div className="overlay-content">
                <h2 className="feature-title">Buck Mason Knitting Mills</h2>
                <p className="feature-description">
                  Continuing the Craftsmanship: Mohnton Knitting Mills becomes Buck Mason Knitting Mills
                </p>
                <div className="feature-cta">
                  <span>Learn More</span>
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
            <h2 className="section-heading">Come Have a Drink</h2>
            <div className="text-content">
              <p>
                We've got great neighbors, classic clothes, and cold drinks up for grabs whenever you wanna stop by. See you soon.
              </p>
              <p>
                <a href="/pages/our-stores" className="text-link">
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
              Everything we create is rooted in the journey of learning, improving, and refining. We work tirelessly to perfect each piece. It's an endless pursuit of crafting garments that are just right.
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