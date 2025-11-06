import React from 'react';

const ContactUs = () => {
  return (
    <section id="contact" className="rounded-4xl shadow py-16 lg:py-24 bg-gradient-to-r from-teal-50 to-sky-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
         
        {/* Left Section - Contact Info & Service Areas */}
          <div className="space-y-8">
            {/* Contact Info Card */}
            <div className="rounded-2xl bg-white  p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-teal-700">Contact Info</h4>
              <p className="mt-2 text-sm text-gray-600">+91 96764 91117</p>
              <p className="text-sm text-gray-600">sales@invisiblegrills.example</p>
            </div>

            {/* Service Areas Card */}
            <div className="rounded-2xl bg-white  p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-teal-700">Service Areas</h4>
              <p className="mt-2 text-sm text-gray-600">Bengaluru · Hyderabad · Mumbai · Pune · Chennai</p>
            </div>

            {/* Social Links Card */}
            <div className="rounded-2xl bg-white  p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-teal-700">Connect with Us</h4>
              <div className="mt-3 space-x-4">
                <a
                  href="https://wa.me/9000000000"
                  className="text-teal-700 hover:text-teal-800 transition-colors"
                  aria-label="Chat with us on WhatsApp"
                >
                  WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/invisiblegrills/"
                  className="text-teal-700 hover:text-teal-800 transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/company/invisiblegrills/"
                  className="text-teal-700 hover:text-teal-800 transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        {/* Right Section - Form */}
          <div className="space-y-8">
            <h3 className="text-3xl sm:text-4xl font-semibold text-teal-700">Request a Free Site Visit</h3>
            <p className="text-lg text-gray-600">
              Share your details, and our team will get back to you with a personalized quote.
            </p>

            <form className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Name Field */}
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="MS Dhoni"
                />
              </div>

              {/* Phone Field */}
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="+91 96764 91117"
                />
              </div>

              {/* City Field */}
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="Chennai"
                />
              </div>

              {/* Message Field */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  placeholder="Tell us about your balcony/window size or requirements..."
                />
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex w-full sm:w-auto justify-center rounded-lg bg-teal-700 px-6 py-3 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
