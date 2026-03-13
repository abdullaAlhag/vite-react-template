import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
const [editingProduct, setEditingProduct] = useState<any>(null);
const [showEditModal, setShowEditModal] = useState(false);

  // جلب المنتجات
  const fetchProducts = () => fetch("/api/products").then(r => r.json()).then(setProducts);

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
    }
  };
  // بيانات المنتج الجديد
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", category: "diagnostics" , images_json: "", description: "" });
const openEditModal = (product: any) => {
    setEditingProduct(product); // نضع بيانات المنتج الحالي في الفورم
    setShowEditModal(true);
};

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // دالة تحويل الصور المختارة إلى Base64
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      // تجديل كل ملل إحو Promise لكممف اإتىال القناتة
      const promises = filesArray.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            // لقرذ ءلنأاخاذ الط بنتف قطب Header الداص نـ Base64
            const base64String = (reader.result as string).split(",")[1];
            resolve(base64String);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      try {
        const base64Results = await Promise.all(promises);
        // الـيص بلحالح دية ثاحدة ةمر ولصور الجدادص
        setSelectedImages(prev => [...prev, ...base64Results]);
      } catch (error) {
        console.error("Error reading files:", error);
      }
    }
  };
const [newEditImages, setNewEditImages] = useState<string[]>([]);

const handleImageChangeForEdit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const filesArray = Array.from(e.target.files);
        const promises = filesArray.map((file) => {
            return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve((reader.result as string).split(",")[1]);
                reader.readAsDataURL(file);
            });
        });
        const results = await Promise.all(promises);
        setNewEditImages(prev => [...prev, ...results]);
    }
};

const handleUpdate = async () => {
    setLoading(true);
    try {
        // 1. تحديث البيانات النصية
        const res = await fetch(`/api/products/${editingProduct.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editingProduct)
        });

        // استخدام المتغير هنا يحل مشكلة TypeScript
        if (!res.ok) {
            throw new Error("Failed to update product data");
        }

        // 2. إذا كانت هناك صور جديدة، ارفعها واربطها بالمنتج
        if (newEditImages.length > 0) {
            const imgRes = await fetch(`/api/products/${editingProduct.id}/images-json`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ images: newEditImages })
            });
            
            if (!imgRes.ok) throw new Error("Failed to upload images");
        }

        alert("تم التحديث بنجاح");
        setShowEditModal(false);
        setNewEditImages([]);
        fetchProducts();
    } catch (error) {
        alert("خطأ في التحديث: " + error);
    } finally {
        setLoading(false);
    }
};

// إرسال البيانات للسيرفر
const handleSubmit = async () => {
  setLoading(true);
  try {
    // 1. إضافة بيانات المنتج أولاً للحصول على ID
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    });
    const productResult = await res.json();

    if (productResult.success && selectedImages.length > 0) {
      // 2. رفع الصور عبر JSON باستخدام الـ ID الناتج
      await fetch(`/api/products/${productResult.id}/images-json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: selectedImages })
      });
    }
    alert("Product added successfully!");
    setShowModal(false);
    setNewProduct({ name: "", price: "", stock: "", category: "", images_json: "", description: "" });
    setSelectedImages([]);
    fetchProducts(); // تحديث القائمة
  } catch (error) {
    alert("Error adding product");
  } finally {
    setLoading(false);
  }
};

return (
  <div className="p-8 bg-gray-50 min-h-screen">
    {/* رأس الصفحة */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-black text-gray-800">Products Management</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition"
      >
        + Add New Product
      </button>
    </div>

    {/* مودال الإضافة (The Modal) */}
    {showModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">New Medical Product</h2>

          <div className="space-y-4">
            <input
              type="text" placeholder="Product Name" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number" placeholder="Price ($)" className="p-4 bg-gray-50 border-none rounded-2xl outline-none"
                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <input
                type="number" placeholder="Stock Quantity" className="p-4 bg-gray-50 border-none rounded-2xl outline-none"
                onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
              />
            </div>

    {/* اختيار الفئة - Dropdown */}
    <div className="relative">
        <label className="block text-xs text-gray-400 mb-1 mr-4">فئة المنتج</label>
        <select 
            className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProduct.category}
            onChange={e => setNewProduct({...newProduct, category: e.target.value})}
        >
            <option value="diagnostics">أجهزة تشخيصية</option>
            <option value="treatment">أجهزة علاجية</option>
            <option value="monitoring">أجهزة مراقبة</option>
            <option value="laboratory">معدات مختبرات</option>
            <option value="surgical">أدوات جراحية</option>
            <option value="other">أخرى</option>
        </select>
    </div>

    {/* حقل الوصف - Description */}
    <textarea 
        placeholder="وصف المنتج التفصيلي..."
        className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
        onChange={e => setNewProduct({...newProduct, description: e.target.value})}
    />

            <div className="border-2 border-dashed border-gray-200 p-8 rounded-3xl text-center">
              <input
                type="file" multiple accept="image/*" className="hidden" id="fileInput"
                onChange={handleImageChange}
              />
              <label htmlFor="fileInput" className="cursor-pointer text-blue-600 font-bold hover:underline">
                Click to upload product images
              </label>
              <p className="text-xs text-gray-400 mt-2">Multiple files allowed</p>
              {selectedImages.length > 0 && <p className="text-sm text-green-600 mt-2">{selectedImages.length} images selected</p>}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit} disabled={loading}
                className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
{showEditModal && editingProduct && (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">تعديل بيانات المنتج</h2>
            
            <div className="space-y-4">
                {/* حقول البيانات الأساسية */}
                <input 
                    value={editingProduct.name}
                    onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
                    placeholder="اسم المنتج"
                />
        <div className="grid grid-cols-2 gap-4">
              <input
                type="number" placeholder="Price ($)" className="p-4 bg-gray-50 border-none rounded-2xl outline-none"
value={editingProduct.price}
                    onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} />
              <input
                type="number" placeholder="Stock Quantity" className="p-4 bg-gray-50 border-none rounded-2xl outline-none"
value={editingProduct.stock}
                    onChange={e => setEditingProduct({...editingProduct, stock: e.target.value})} />
            </div>

    {/* اختيار الفئة - Dropdown */}
    <div className="relative">
        <label className="block text-xs text-gray-400 mb-1 mr-4">فئة المنتج</label>
        <select
            className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
 value={editingProduct.category}
                    onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} >
            <option value="diagnostics">أجهزة تشخيصية</option>
            <option value="treatment">أجهزة علاجية</option>
            <option value="monitoring">أجهزة مراقبة</option>
            <option value="laboratory">معدات مختبرات</option>
            <option value="surgical">أدوات جراحية</option>
            <option value="other">أخرى</option>
        </select>
    </div>                
                <textarea 
                    value={editingProduct.description}
                    onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none min-h-[80px]"
                    placeholder="الوصف"
                />

                {/* عرض الصور الحالية */}
                <div className="py-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">الصور الحالية:</label>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {editingProduct.images_json && JSON.parse(editingProduct.images_json).map((img: string, index: number) => (
                            <img 
                                key={index} 
                                src={img} 
                                alt="Product" 
                                className="w-20 h-20 object-cover rounded-xl border" 
                            />
                        ))}
                        {(!editingProduct.images_json || JSON.parse(editingProduct.images_json).length === 0) && (
                            <p className="text-xs text-gray-400 italic">لا توجد صور لهذا المنتج</p>
                        )}
                    </div>
                </div>

                {/* خيار إضافة صور جديدة */}
                <div className="border-2 border-dashed border-gray-200 p-4 rounded-2xl text-center">
                    <input 
                        type="file" multiple accept="image/*" className="hidden" id="editFileInput"
                        onChange={handleImageChangeForEdit} // دالة سننشئها بالأسفل
                    />
                    <label htmlFor="editFileInput" className="cursor-pointer text-blue-600 text-sm font-bold">
                        + إضافة صور إضافية
                    </label>
                    {newEditImages.length > 0 && (
                        <p className="text-xs text-green-600 mt-1">تم اختيار {newEditImages.length} صور جديدة</p>
                    )}
                </div>

                <div className="flex gap-4 pt-4">
                    <button onClick={() => setShowEditModal(false)} className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold">إلغاء</button>
                    <button onClick={handleUpdate} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg">
                        حفظ التعديلات
                    </button>
                </div>
            </div>
        </div>
    </div>
)}

    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black">Control Panel</h1>
        <button onClick={() => setShowModal(true)} className="bg-green-500 text-white px-6 py-3 rounded-full font-bold">+ New Product</button>
      </div>

      <div className="grid gap-4">
        {products.map((p: any) => (
          <div key={p.id} className="bg-white p-6 rounded-2xl shadow-sm border flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xl">{p.name}</h3>
              <p className="text-gray-500">${p.price} | Stock: {p.stock}</p>
            </div>
            <div className="space-x-4">
              <button onClick={() => openEditModal(p)} className="text-blue-600 font-bold">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="text-red-500 font-bold">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* هنا يمكنك إضافة الـ Modal الخاص بإضافة منتج جديد مع رفع الصور عبر JSON */}
    </div>

    {/* جدول المنتجات الحالي (Listing) */}
    {/* ... كود القائمة السابق ... */}
  </div>
);
}

//return (
//  );
//}

