import React from 'react'

const ContactUs = () => {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl text-teal-700 font-semibold tracking-tight">Request a Free Site Visit</h3>
            <p className="mt-3 text-gray-600">
              Share your details and our team will get back to you with a personalized quote.
            </p>

            <form className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200" placeholder="John Doe" />
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200" placeholder="+91 90000 00000" />
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200" placeholder="Bengaluru" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea rows={4} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200" placeholder="Tell us about your balcony/window size or requirements..." />
              </div>
              <div className="sm:col-span-2">
                <button type="button" className="inline-flex w-full sm:w-auto rounded-md bg-teal-700 px-5 py-3 text-sm font-medium text-white hover:bg-teal-800">
                  Submit Request
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 p-6 bg-white">
              <h4 className="font-medium">Contact</h4>
              <p className="mt-2 text-sm text-gray-600">+91 90000 00000</p>
              <p className="text-sm text-gray-600">sales@invisiblegrills.example</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6 bg-white">
              <h4 className="font-medium">Service Areas</h4>
              <p className="mt-2 text-sm text-gray-600">Bengaluru · Hyderabad · Mumbai · Pune · Chennai</p>
            </div>

            <div>
              <div className="aspect-[16/9] w-full rounded-xl border border-dashed border-gray-300 bg-gray-50" />
              <p className="mt-2 text-xs text-gray-500">Placeholder for map or showroom image</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
