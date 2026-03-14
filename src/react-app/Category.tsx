//أنشئ ملفاً جديداً في src / react - app / ProductDetails.tsx.هذه الصفحة ستقوم بجلب المنتج بناءً على الـ ID الموجود في الرابط، ثم تجلب منتجات أخرى لنفس القسم(Related Products).
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    images_json: string; // نص JSON يحتوي على مصفوفة روابط الصور
    description: string;
}
export default function Category() {
  
    const [products, setProducts] = useState<Product[]>([]);
    const { category } = useParams(); // جلب الـ ID من الرابط /product/5
    // دالة مساعدة لتحويل نص JSON الصور إلى مصفوفة حقيقية
    const getImageUrl = (path: string) => {
        if (path.startsWith('http')) return path;
        // سيقوم بإضافة الدومين الحالي تلقائياً
        return `${window.location.origin}${path}`;
    };


    useEffect(() => {
        // 1. جلب بيانات المنتج الحالي
        fetch(`/api/category/${category}`)
            .then(res => res.json())
            .then(data => setProducts(data));



        window.scrollTo(0, 0); // للعودة لأعلى الصفحة عند الانتقال
    }, [category]);

    

    return (
        <div >
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">
                        <span className="text-gray-900">Medical Equipment By Category:{category}</span>
                    </h1>

                </nav>
            </header>
            <main className="max-w-7xl mx-auto px-6 py-10">

                {/*// شبكة المنتجات (Grid)*/}
                <div dir="ltr" className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 max-w-7xl mx-auto">
                    {products.map((p) => (
                        <Link to={`/product/${p.id}`} key={p.id}
                            className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer border border-gray-100 group"
                        >
                            <img
                                src={getImageUrl(JSON.parse(p.images_json || "[]")[0])}
                                alt={p.name}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                                    {p.name}
                                </h3>
                     {/*           <div className="flex justify-between items-center mt-4 bg-gray-50 p-3 rounded-xl">*/}
                  {/*                  <span className="text-3xl font-black text-blue-600">*/}
               {/*                         ${p.price.toLocaleString()}*/}
            {/*                        </span>*/}
         {/*                           <span className={`text-sm px-3 py-1 rounded-full ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>*/}
      {/*                                  {p.stock > 0 ? `Available: ${p.stock}` : 'Not Available'}*/}
   {/*                                 </span>*/}
{/*                                </div>*/}
                            </div>
                        </Link>

                    ))}
                </div>

            </main>

        </div>
    );
}
