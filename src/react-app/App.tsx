
//الآن سنقوم بإعداد الـ Routes وتعديل القائمة الرئيسية لتنقلنا للصفحة الجديدة.
    // src/react-app/App.tsx
//import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route, Link , Navigate} from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Shipping from "./pages/Shipping";
import Terms from "./pages/Terms";

import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import Category from "./Category";
import ProductDetails from "./ProductDetails";
// تحديث واجهة React في src / App.tsx
//سنقوم بتعديل الواجهة لعرض المنتجات القادمة من قاعدة البيانات بدلاً من مجرد عرض الاسم.
    // src/App.tsx
    import { useState, useEffect } from "react";
// ... الاحتفاظ بالـ imports السابقة
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
//import cloudflareLogo from "./assets/Cloudflare_Logo.svg";
//import honoLogo from "./assets/hono.svg";
import "./App.css";

// تعريف نوع بيانات المنتج لـ TypeScript
interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    images_json: string; // نص JSON يحتوي على مصفوفة روابط الصور
    description: string;
}
function HomePage({ products }: { products: any[] }) {
    if (products.length===0) return <div className="p-10 text-center">جاري التحميل...</div>;
    return (
   <div >
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">
                        <span className="text-gray-900">Medical Equipment Catalog</span>
                    </h1>

                </nav>
            </header>
            <main className="max-w-7xl mx-auto px-6 py-10">
                
                    {/*// شبكة المنتجات (Grid)*/}
                    <div dir="ltr" className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 max-w-7xl mx-auto">
                        {products.map((p) => (
                                                              <Link to={`/product/${p.id}`} key={p.id}
                                    className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer border border-gray-100 group">
  <img
                                    src={JSON.parse(p.images_json || "[]")[0]} alt={p.name}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                                            {p.name}
                                        </h3>
{/*<div className="flex justify-between items-center mt-4 bg-gray-50 p-3 rounded-xl">*/}
   {/*                                         <span className="text-3xl font-black text-blue-600">*/}
      {/*                                          ${p.price.toLocaleString()}*/}
         {/*                                   </span>*/}
            {/*                                <span className={`text-sm px-3 py-1 rounded-full ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>*/}
               {/*                                 {p.stock > 0 ? `Available: ${p.stock}` : 'Not Available'}*/}
                  {/*                          </span>*/}
                     {/*                   </div>*/}
                                </div>
                            </Link>
                          
                        ))}
                    </div>
            
            </main>
       
        </div>
    );
}

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));


    useEffect(() => {
        fetch("/api/products").then(res => res.json()).then(data => setProducts(data));
    }, []);

    return (
        <div className="flex flex-col min-h-screen font-[Tajawal]"> {/* تأكد من وجود خط عربي جميل */}
            <Header />

            <main className="flex-grow">
        <Routes>
                    <Route path="/" element={<HomePage products={products} />} />
                    <Route path="/category/:category" element={<Category />} />
                   
            <Route path="/product/:id" element={<ProductDetails />} />
<Route path="/login" element={<Login onLogin={setUser} />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/faq" element={<Faq />} />
<Route path="/shipping" element={<Shipping />} />
<Route path="/terms" element={<Terms />} />	
      
      {/* حماية لوحة التحكم */}
      <Route path="/admin" element={
        user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />
      } />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}



export default App;
