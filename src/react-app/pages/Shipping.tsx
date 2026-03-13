export default function Shipping() {
  return (
    <div className="min-h-screen py-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center">Shipping Information</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
          <h3 className="text-xl font-bold mb-4 text-blue-700">Safe Delivery</h3>
          <p className="text-gray-600">All devices are shipped in temperature-controlled, shock-absorbent packaging to ensure they arrive in perfect calibration.</p>
        </div>
        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Return Policy</h3>
          <p className="text-gray-600">We accept returns within 30 days if the medical seal is unbroken. Technical defects are covered under our instant replacement policy.</p>
        </div>
      </div>
    </div>
  );
}

