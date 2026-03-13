//أنشئ ملفاً جديداً في src / react - app / ProductDetails.tsx.هذه الصفحة ستقوم بجلب المنتج بناءً على الـ ID الموجود في الرابط، ثم تجلب منتجات أخرى لنفس القسم(Related Products).
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetails() {
    
    const { id } = useParams(); // جلب الـ ID من الرابط /product/5
    const [product, setProduct] = useState<any>(null);
    const [related, setRelated] = useState<any[]>([]);

    useEffect(() => {
        // 1. جلب بيانات المنتج الحالي
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));

        // 2. جلب منتجات مقترحة (بشكل بسيط: جلب كل المنتجات وتصفية الحالي)
        fetch(`/api/products`)
            .then(res => res.json())
            .then(data => setRelated(data.filter((p: any) => p.category == String(p.category)).slice(0, 4)));

        window.scrollTo(0, 0); // للعودة لأعلى الصفحة عند الانتقال
    }, [id]);

    if (!product) return <div className="p-10 text-center">جاري التحميل...</div>;

    const images = JSON.parse(product.images_json || "[]");
    // دالة مساعدة لتحويل نص JSON الصور إلى مصفوفة حقيقية
    const getImageUrl = (path: string) => {
        if (path.startsWith('http')) return path;
        // سيقوم بإضافة الدومين الحالي تلقائياً
        return `${window.location.origin}${path}`;
    };

    const parseImages = (jsonString: string): string[] => {
        try {
            return JSON.parse(jsonString || "[]");
        } catch (e) {
            return ["https://placehold.co/400"]; // صورة افتراضية في حال الخطأ
        }
    };
    return (
       
        <div className="min-h-screen bg-white p-6" dir="ltr">
            <div className="max-w-6xl mx-auto">
                <Link title="الرجوع" to="/" className="text-blue-600 mb-6 inline-block font-bold">← Back</Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* معرض الصور في التفاصيل */}
                    <div>
                        <img id="mainImage"
                            src={getImageUrl(images[0])}
                            alt={product.name}
                            className="w-full h-96 object-cover rounded-2xl shadow-lg"
                        />
                        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
{parseImages(product.images_json).map((img, index) => (
                                <img key={index} src={getImageUrl(img)} className="w-20 h-20 object-cover rounded-lg border-2 border-gray-100 hover:border-blue-500 cursor-pointer" onClick={() => {
                                    const el = document.getElementById("mainImage") as HTMLImageElement;
                                    if (el) el.src = getImageUrl(img);
                                }} />
                            ))}
                        </div>
                    </div>
                        {/* معلومات المنتج */}
                    <div className="flex flex-col justify-center">
                        <Link to={`/category/${product.category}`} key={product.category}> Category : {product.category}</Link>
                        <h1 className="text-4xl font-black text-gray-900 mb-4">{product.name}</h1>
                        <p className="text-3xl text-blue-600 font-bold mb-6">${product.price}</p>
                        <div className="bg-gray-50 p-6 rounded-2xl mb-8">
                            <h3 className="font-bold mb-2">Description:</h3>
                            <p className="text-gray-600"> {product.description}</p>
                        </div>
                        <button className="bg-blue-600 text-white py-4 rounded-xl text-xl font-bold hover:bg-blue-700 transition">Order Now</button>
                    </div>
                </div>

                {/* قسم المنتجات ذات الصلة */}
                <div className="mt-20  justify-left" >
                    <h2  className="text-2xl font-bold mb-8 border-r-4 border-blue-600 pb-4">Related Products</h2>
                    <div  className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {related.map(item => (
                            <Link to={`/product/${item.id}`} key={item.id} className="group">
                                <img src={getImageUrl(JSON.parse(item.images_json || "[]")[0])} className="w-full h-40 object-cover rounded-xl mb-2 group-hover:shadow-md transition" />
                                <h4 className="font-bold text-gray-800 group-hover:text-blue-600">{item.name}</h4>
                                <p className="text-blue-600 text-sm font-bold">${item.price}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            </div>
       
    );
}
