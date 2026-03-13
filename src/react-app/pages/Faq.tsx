export default function Faq() {
  const faqs = [
    { q: "Do you offer international shipping?", a: "Yes, we ship medical equipment globally with specialized medical-grade packaging." },
    { q: "What is the warranty on devices?", a: "Most of our electronic medical devices come with a standard 2-year manufacturer warranty." },
    { q: "Can I get a bulk discount?", a: "Absolutely. Please contact our sales team for hospital-wide procurement pricing." }
  ];

  return (
    <div className="min-h-screen py-20 px-6 max-w-3xl mx-auto text-left">
      <h1 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="group border-b border-gray-100 pb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition cursor-pointer">
              Q: {faq.q}
            </h3>
            <p className="text-gray-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

