export default function About() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-black text-gray-900 mb-8">About <span className="text-blue-600">TechnoGermany</span></h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-12">
          Founded in 2026, we are dedicated to providing hospitals and clinics with cutting-edge medical technology. 
          Our mission is to bridge the gap between advanced innovation and healthcare accessibility.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { label: "10k+", sub: "Devices Delivered" },
            { label: "99%", sub: "Customer Satisfaction" },
            { label: "24/7", sub: "Technical Support" }
          ].map((stat, i) => (
            <div key={i} className="p-8 bg-blue-50 rounded-3xl hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-blue-600">{stat.label}</div>
              <div className="text-gray-500 text-sm">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

