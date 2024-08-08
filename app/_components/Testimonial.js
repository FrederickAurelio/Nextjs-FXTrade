import RightTestimonial from "./RightTestimonial"

function Testimonial() {
  return (
    <section
      id="testimonials"
      className="flex h-dvh w-full flex-col overflow-hidden px-6 py-5 md:px-10 lg:px-20"
    >
      <h1 className="mb-16 text-xl font-bold md:text-3xl">Testimonials</h1>
      <RightTestimonial>
        The app{"'"}s real-time rates and risk-free environment are perfect for
        beginners like me.
      </RightTestimonial>
      <div className="testimonial">
        Seamless, intuitive, and great for learning trades on both mobile and
        desktop.
      </div>
      <RightTestimonial>
        The app{"'"}s responsiveness on both mobile and desktop is a
        game-changer for my trading activities.
      </RightTestimonial>
      <div className="testimonial">
        The minimalist design and fake money feature make trading a breeze.
      </div>
      <RightTestimonial>
        A great app for learning forex trading with no real money risk involved.
      </RightTestimonial>
      <div className="testimonial">
        The real-time exchange rates and intuitive design make this app stand
        out.
      </div>
      <RightTestimonial>
        A fantastic app for beginners, offering a risk-free way to learn
        trading.
      </RightTestimonial>
    </section>
  )
}

export default Testimonial
