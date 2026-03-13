// src/react-app/components/Footer.tsx
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-20">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12 text-left">

                <div className="md:col-span-1">
                    <h2 className="text-white text-2xl font-black mb-6">Techno<span className="text-blue-500">Germany</span></h2>
                    <p className="text-sm leading-relaxed text-gray-400">
                        We provide the best medical solutions and high-quality equipment to ensure better healthcare across the region.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-6">Quick Links</h3>
                    <ul className="space-y-4 text-sm text-left">
                        <li><Link to="/" className="hover:text-blue-500 transition">Shop</Link></li>
                        <li><Link to="/about" className="hover:text-blue-500 transition">About Company</Link></li>
                        <li><Link to="/terms" className="hover:text-blue-500 transition">Terms & Conditions</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-6">Support</h3>
                    <ul className="space-y-4 text-sm text-left">
                        <li><Link to="/faq" className="hover:text-blue-500 transition">FAQs</Link></li>
                        <li><Link to="/shipping" className="hover:text-blue-500 transition">Shipping Info</Link></li>
                        <li><Link to="/contact" className="hover:text-blue-500 transition">Help Center</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-6">Newsletter</h3>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="bg-gray-800 border-none rounded-lg px-4 py-2 w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
            <div className="text-center mt-8 text-xs text-gray-500 font-medium">
                © 2026 Medical Store. All rights reserved. Developed by  <a href="https://www.facebook.com/abdulla.saleh3" className="text-blue-500 hover:underline">Abdullah Alhaj</a>
            </div>
        </footer>
    );
}
