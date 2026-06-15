import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import {
  FaShoppingBag, FaUsers, FaLeaf, FaChartLine,
  FaPlus, FaEdit, FaTrash,
  FaArrowLeft, FaDatabase, FaExclamationTriangle
} from "react-icons/fa";

// ── Supabase Setup ──
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
const supabase = (SUPABASE_URL && SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL")
  ? createClient(SUPABASE_URL, SUPABASE_ANON)
  : null;

// ── Types ──
interface Order {
  id: number;
  created_at?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_country: string;
  customer_city: string;
  order_items: string;
  total_amount: string;
  notes?: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  source: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "customer";
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "users" | "settings">("orders");
  const [isUsingMock, setIsUsingMock] = useState(!supabase);

  // States for DB data
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Settings states
  const [whatsappSetting, setWhatsappSetting] = useState("251952161260");
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsFeedback, setSettingsFeedback] = useState("");

  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("hyssop_admin_authenticated") === "true");
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");

  const [dbAdminUser, setDbAdminUser] = useState("admin");
  const [dbAdminPass, setDbAdminPass] = useState("admin");

  const [editAdminUser, setEditAdminUser] = useState("admin");
  const [editAdminPass, setEditAdminPass] = useState("");

  // Form Modals
  const [showModal, setShowModal] = useState<"order" | "product" | "user" | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Form states
  const [orderForm, setOrderForm] = useState<Partial<Order>>({
    customer_name: "", customer_email: "", customer_phone: "",
    customer_country: "", customer_city: "", order_items: "",
    total_amount: "$0.00", notes: "", status: "pending", source: "admin"
  });

  const [productForm, setProductForm] = useState<Partial<Product>>({
    title: "", description: "", price: "", image: "/images/product1.jpg", category: "Medicinal Herbs"
  });

  const [userForm, setUserForm] = useState<Partial<User>>({
    name: "", email: "", phone: "", role: "customer"
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [uploadingImg, setUploadingImg] = useState(false);

  // ── Initial Mock Data ──
  const mockOrders: Order[] = [
    { id: 101, created_at: new Date().toISOString(), customer_name: "Alice Vance", customer_email: "alice@gmail.com", customer_phone: "+1 555-0199", customer_country: "US", customer_city: "Seattle", order_items: "Papaya Leaf × 2\nMhyrr × 1", total_amount: "$39.00", status: "pending", source: "cart" },
    { id: 102, created_at: new Date().toISOString(), customer_name: "David Sterling", customer_email: "david@sterling.io", customer_phone: "+44 20-7946", customer_country: "UK", customer_city: "London", order_items: "Vitality Herbal Blend × 1", total_amount: "$16.00", status: "processing", source: "direct" },
    { id: 103, created_at: new Date().toISOString(), customer_name: "Yuki Tanaka", customer_email: "yuki.tanaka@japan.com", customer_phone: "+81 3-5555", customer_country: "JP", customer_city: "Tokyo", order_items: "Ashwagandha × 3", total_amount: "$33.00", status: "completed", source: "cart" }
  ];

  const mockProducts: Product[] = [
    { id: 1, title: "Papaya Leaf", description: "Rich in enzymes and antioxidants supporting healthy digestion.", price: "$12.00", image: "/images/Papaya Leaf.jpg", category: "Medicinal Herbs" },
    { id: 2, title: "Mhyrr", description: "Premium natural resin traditionally used for purifying wellness rituals.", price: "$15.00", image: "/images/Mhyrr.jpg", category: "Essential Resins" },
    { id: 3, title: "Ashwagandha", description: "Adaptogenic root supporting calmness, vitality, and balance.", price: "$11.00", image: "/images/Ashwagandha.jpg", category: "Medicinal Herbs" }
  ];

  const mockUsers: User[] = [
    { id: 1, name: "Admin Manager", email: "admin@hyssopherb.com", phone: "+1 800-HYSSOP", role: "admin" },
    { id: 2, name: "Alice Vance", email: "alice@gmail.com", phone: "+1 555-0199", role: "customer" },
    { id: 3, name: "David Sterling", email: "david@sterling.io", phone: "+44 20-7946", role: "customer" }
  ];

  // Load Data — a tick increment is used by save/delete handlers to trigger a re-fetch
  const [fetchTick, setFetchTick] = useState(0);
  const loadData = useCallback(() => setFetchTick(t => t + 1), []);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setErrorMsg("");

      if (!supabase || isUsingMock) {
        // Simulate fetch delay
        setTimeout(() => {
          if (cancelled) return;
          setOrders(mockOrders);
          setProducts(mockProducts);
          setUsers(mockUsers);
          setLoading(false);
        }, 500);
        return;
      }

      try {
        // Fetch Orders
        const { data: dbOrders, error: oError } = await supabase
          .from("orders")
          .select("*")
          .order("id", { ascending: false });

        // Fetch Products
        const { data: dbProducts, error: pError } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });

        // Fetch Users
        const { data: dbUsers, error: uError } = await supabase
          .from("users")
          .select("*")
          .order("id", { ascending: true });

        if (cancelled) return;

        if (oError || pError || uError) {
          console.warn("Table load failed, check if tables exist in Supabase:", { oError, pError, uError });
          setErrorMsg("Failed to load tables from Supabase. Ensure you run the SQL migration script in Supabase SQL Editor. Reverting to Mock Mode for preview.");
          setIsUsingMock(true);
          setOrders(mockOrders);
          setProducts(mockProducts);
          setUsers(mockUsers);
        } else {
          setOrders(dbOrders || []);
          setProducts(dbProducts || []);
          setUsers(dbUsers || []);

          try {
            const { data: sData, error: sError } = await supabase
              .from("settings")
              .select("key, value");
            if (!sError && sData && !cancelled) {
              const wa = sData.find(s => s.key === "whatsapp_number");
              if (wa) setWhatsappSetting(wa.value);

              const au = sData.find(s => s.key === "admin_username");
              if (au) {
                setDbAdminUser(au.value);
                setEditAdminUser(au.value);
              }

              const ap = sData.find(s => s.key === "admin_password");
              if (ap) {
                setDbAdminPass(ap.value);
              }
            }
          } catch (sErr) {
            console.warn("Failed to load settings from DB:", sErr);
          }
        }
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setErrorMsg("Error fetching database. Defaulting to local mock mode.");
        setIsUsingMock(true);
        setOrders(mockOrders);
        setProducts(mockProducts);
        setUsers(mockUsers);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void run();
    return () => { cancelled = true; };
  }, [fetchTick, isUsingMock]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── DB / Action Handlers ──
  const handleSaveOrder = async () => {
    if (!orderForm.customer_name || !orderForm.customer_email || !orderForm.order_items) {
      alert("Please fill in required fields (Name, Email, Items)");
      return;
    }

    if (isUsingMock || !supabase) {
      if (modalMode === "add") {
        setOrders([{ ...orderForm, id: Date.now() } as Order, ...orders]);
      } else {
        setOrders(orders.map(o => o.id === selectedId ? { ...o, ...orderForm } as Order : o));
      }
      setShowModal(null);
      return;
    }

    try {
      if (modalMode === "add") {
        const { error } = await supabase.from("orders").insert([orderForm]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("orders").update(orderForm).eq("id", selectedId);
        if (error) throw error;
      }
      setShowModal(null);
      loadData();
    } catch (err: unknown) {
      alert("Error saving to Supabase: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleSaveProduct = async () => {
    if (!productForm.title || !productForm.price) {
      alert("Please fill in Title and Price");
      return;
    }

    if (isUsingMock || !supabase) {
      if (modalMode === "add") {
        setProducts([...products, { ...productForm, id: Date.now() } as Product]);
      } else {
        setProducts(products.map(p => p.id === selectedId ? { ...p, ...productForm } as Product : p));
      }
      setShowModal(null);
      return;
    }

    try {
      if (modalMode === "add") {
        const { error } = await supabase.from("products").insert([productForm]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").update(productForm).eq("id", selectedId);
        if (error) throw error;
      }
      setShowModal(null);
      loadData();
    } catch (err: unknown) {
      alert("Error saving to Supabase: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImg(true);
    if (isUsingMock || !supabase) {
      // Mock mode - create local object URL
      setProductForm(prev => ({ ...prev, image: URL.createObjectURL(file) }));
      setUploadingImg(false);
      return;
    }

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      // Upload to storage bucket "products"
      const { error } = await supabase.storage
        .from("products")
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      setProductForm(prev => ({ ...prev, image: publicUrlData.publicUrl }));
    } catch (err: unknown) {
      alert("Storage upload failed: " + (err instanceof Error ? err.message : String(err)) + "\n\nNote: Make sure to create a public Storage Bucket named 'products' in your Supabase Dashboard under Storage -> New Bucket.");
    } finally {
      setUploadingImg(false);
    }
  };

  const handleJsonImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!Array.isArray(parsed)) {
          alert("JSON file must be an array of product objects.");
          return;
        }

        const validated = parsed.map((item: Record<string, string>, idx: number) => ({
          title: item.title || `Botanical Herb #${idx + 1}`,
          description: item.description || "[No description available]",
          price: item.price || "$10.00",
          image: item.image || "/images/product1.jpg",
          category: item.category || "Medicinal Herbs"
        }));

        if (confirm(`Found ${validated.length} products in JSON. Do you want to import them?`)) {
          setLoading(true);
          if (isUsingMock || !supabase) {
            const withIds = validated.map((v, i) => ({ ...v, id: Date.now() + i }));
            setProducts(prev => [...prev, ...withIds]);
            setLoading(false);
            alert(`Imported ${validated.length} products into local preview registry!`);
          } else {
            const { error } = await supabase.from("products").insert(validated);
            if (error) throw error;
            loadData();
            alert(`Imported ${validated.length} products into Supabase!`);
          }
        }
      } catch (err: unknown) {
        alert("Failed to parse JSON file: " + (err instanceof Error ? err.message : String(err)));
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleSaveUser = async () => {
    if (!userForm.name || !userForm.email) {
      alert("Please fill in Name and Email");
      return;
    }

    if (isUsingMock || !supabase) {
      if (modalMode === "add") {
        setUsers([...users, { ...userForm, id: Date.now() } as User]);
      } else {
        setUsers(users.map(u => u.id === selectedId ? { ...u, ...userForm } as User : u));
      }
      setShowModal(null);
      return;
    }

    try {
      if (modalMode === "add") {
        const { error } = await supabase.from("users").insert([userForm]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("users").update(userForm).eq("id", selectedId);
        if (error) throw error;
      }
      setShowModal(null);
      loadData();
    } catch (err: unknown) {
      alert("Error saving to Supabase: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    setSettingsFeedback("");

    const cleanNumber = whatsappSetting.replace(/[^0-9]/g, "");
    if (!cleanNumber) {
      setSettingsFeedback("Please enter a valid numeric phone number.");
      setSavingSettings(false);
      return;
    }

    if (!editAdminUser) {
      setSettingsFeedback("Admin Username cannot be empty.");
      setSavingSettings(false);
      return;
    }

    if (isUsingMock || !supabase) {
      setWhatsappSetting(cleanNumber);
      setDbAdminUser(editAdminUser);
      if (editAdminPass) {
        setDbAdminPass(editAdminPass);
      }
      setSettingsFeedback("Settings successfully updated in Mock state!");
      setSavingSettings(false);
      return;
    }

    try {
      const { error: err1 } = await supabase
        .from("settings")
        .upsert([{ key: "whatsapp_number", value: cleanNumber }], { onConflict: "key" });
      if (err1) throw err1;

      const { error: err2 } = await supabase
        .from("settings")
        .upsert([{ key: "admin_username", value: editAdminUser }], { onConflict: "key" });
      if (err2) throw err2;
      setDbAdminUser(editAdminUser);

      if (editAdminPass) {
        const { error: err3 } = await supabase
          .from("settings")
          .upsert([{ key: "admin_password", value: editAdminPass }], { onConflict: "key" });
        if (err3) throw err3;
        setDbAdminPass(editAdminPass);
        setEditAdminPass("");
      }

      setSettingsFeedback("All settings and admin credentials successfully updated in Supabase!");
    } catch (err: unknown) {
      console.error("Failed to save settings:", err);
      setSettingsFeedback(`Error saving settings: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (loginUser === dbAdminUser && loginPass === dbAdminPass) {
      localStorage.setItem("hyssop_admin_authenticated", "true");
      setIsLoggedIn(true);
    } else {
      setLoginError("Invalid username or password. Access to sanctuary registry denied.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hyssop_admin_authenticated");
    setIsLoggedIn(false);
    setLoginUser("");
    setLoginPass("");
    setLoginError("");
  };

  const handleDelete = async (id: number, type: "orders" | "products" | "users") => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    if (isUsingMock || !supabase) {
      if (type === "orders") setOrders(orders.filter(o => o.id !== id));
      if (type === "products") setProducts(products.filter(p => p.id !== id));
      if (type === "users") setUsers(users.filter(u => u.id !== id));
      return;
    }

    try {
      const { error } = await supabase.from(type).delete().eq("id", id);
      if (error) throw error;
      loadData();
    } catch (err: unknown) {
      alert("Error deleting from Supabase: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  // ── Open Modals ──
  const openOrderModal = (mode: "add" | "edit", order?: Order) => {
    setModalMode(mode);
    if (mode === "edit" && order) {
      setSelectedId(order.id);
      setOrderForm(order);
    } else {
      setSelectedId(null);
      setOrderForm({
        customer_name: "", customer_email: "", customer_phone: "",
        customer_country: "", customer_city: "", order_items: "",
        total_amount: "$0.00", notes: "", status: "pending", source: "admin"
      });
    }
    setShowModal("order");
  };

  const openProductModal = (mode: "add" | "edit", prod?: Product) => {
    setModalMode(mode);
    if (mode === "edit" && prod) {
      setSelectedId(prod.id);
      setProductForm(prod);
    } else {
      setSelectedId(null);
      setProductForm({
        title: "", description: "", price: "", image: "/images/product1.jpg", category: "Medicinal Herbs"
      });
    }
    setShowModal("product");
  };

  const openUserModal = (mode: "add" | "edit", user?: User) => {
    setModalMode(mode);
    if (mode === "edit" && user) {
      setSelectedId(user.id);
      setUserForm(user);
    } else {
      setSelectedId(null);
      setUserForm({ name: "", email: "", phone: "", role: "customer" });
    }
    setShowModal("user");
  };

  // Stats Calculator
  const totalSales = orders
    .filter(o => o.status === "completed" || o.status === "processing" || o.status === "pending")
    .reduce((sum, o) => {
      const val = parseFloat(o.total_amount.replace("$", ""));
      return sum + (isNaN(val) ? 0 : val);
    }, 0);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#061411] text-white font-sans selection:bg-green-500/30 flex items-center justify-center relative p-6 overflow-hidden">
        {/* Dynamic pollen backgrounds */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-150 h-150 bg-green-500/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-emerald-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Frosted Glass Login Box */}
          <div className="relative bg-[#0b1f1a]/80 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl space-y-6">
            <div className="absolute -inset-0.5 bg-linear-to-br from-green-500/20 to-emerald-900/20 rounded-[2.5rem] blur opacity-30 pointer-events-none"></div>

            <div className="relative text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20 mb-4 animate-bounce">
                🌿
              </div>
              <h2 className="text-3xl font-serif text-white leading-tight">
                Sanctuary <span className="italic text-green-400">Registry</span>
              </h2>
              <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-light">
                Secure Hyssop Admin Access
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 pt-2">
              {loginError && (
                <div className="bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-xl text-red-400 text-xs text-center font-medium">
                  ⚠️ {loginError}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  placeholder="Enter administrator username"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition-all font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="Enter administrator password"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition-all font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-linear-to-r from-green-500 to-emerald-600 hover:brightness-110 active:scale-[0.98] text-white font-black uppercase text-xs tracking-widest rounded-xl transition-all shadow-xl hover:shadow-green-500/10 flex items-center justify-center gap-2 cursor-pointer mt-6"
              >
                🔐 Authenticate & Enter
              </button>
            </form>

            <div className="text-center pt-2">
              <Link to="/" className="text-xs text-white/40 hover:text-white transition-all">
                ← Return to storefront
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061411] text-white font-sans selection:bg-green-500/30">
      {/* Dynamic pollen backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-150 h-150 bg-green-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-emerald-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-8">

        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link to="/" className="text-white/40 hover:text-white transition-all flex items-center gap-1.5 text-xs uppercase tracking-widest">
                <FaArrowLeft className="text-[10px]" /> Back to Sanctuary
              </Link>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-light text-white flex items-center gap-3">
              Hyssop <span className="text-green-400 italic">Dashboard</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-red-500/25 bg-red-500/10 rounded-full text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all text-[10px] font-black uppercase tracking-widest cursor-pointer"
            >
              Logout 🔓
            </button>
          </div>
        </header>

        {/* System Messages */}
        {errorMsg && (
          <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3 text-sm text-amber-200">
            <FaExclamationTriangle className="mt-0.5 shrink-0 text-amber-400" />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white/2 border border-white/5 backdrop-blur-md rounded-4xl p-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-bold block mb-1">Total Sales</span>
              <p className="text-xl sm:text-2xl font-serif text-white">${totalSales.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center text-green-400">
              <FaChartLine />
            </div>
          </div>

          <div className="bg-white/2 border border-white/5 backdrop-blur-md rounded-4xl p-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-bold block mb-1">Total Orders</span>
              <p className="text-xl sm:text-2xl font-serif text-white">{orders.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center text-green-400">
              <FaShoppingBag />
            </div>
          </div>

          <div className="bg-white/2 border border-white/5 backdrop-blur-md rounded-4xl p-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-bold block mb-1">Products Listed</span>
              <p className="text-xl sm:text-2xl font-serif text-white">{products.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center text-green-400">
              <FaLeaf />
            </div>
          </div>

          <div className="bg-white/2 border border-white/5 backdrop-blur-md rounded-4xl p-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-bold block mb-1">Registered Users</span>
              <p className="text-xl sm:text-2xl font-serif text-white">{users.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center text-green-400">
              <FaUsers />
            </div>
          </div>
        </section>

        {/* Tab Controls & Add Item Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 self-start">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-black transition-all cursor-pointer ${activeTab === "orders" ? "bg-green-600 text-white shadow-lg" : "text-white/50 hover:text-white"
                }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-black transition-all cursor-pointer ${activeTab === "products" ? "bg-green-600 text-white shadow-lg" : "text-white/50 hover:text-white"
                }`}
            >
              Products ({products.length})
            </button>
            
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-black transition-all cursor-pointer ${activeTab === "settings" ? "bg-green-600 text-white shadow-lg" : "text-white/50 hover:text-white"
                }`}
            >
              Settings
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
            {activeTab === "products" && (
              <>
                <input
                  type="file"
                  accept=".json"
                  id="json-import-input"
                  className="hidden"
                  onChange={handleJsonImport}
                />
                <button
                  onClick={() => document.getElementById("json-import-input")?.click()}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl cursor-pointer transition-all"
                >
                  <FaDatabase className="text-amber-400" /> Import JSON
                </button>
              </>
            )}
            <button
              onClick={() => {
                if (activeTab === "orders") openOrderModal("add");
                if (activeTab === "products") openProductModal("add");
                if (activeTab === "users") openUserModal("add");
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:shadow-green-500/10 cursor-pointer transition-all"
            >
              <FaPlus /> Add New {activeTab.slice(0, -1)}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white/1 border border-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-white/40 gap-4">
              <div className="w-10 h-10 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
              <span className="text-[10px] uppercase tracking-widest font-black animate-pulse">Gathering records...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">

              {/* ORDERS TAB */}
              {activeTab === "orders" && (
                <table className="w-full text-left border-collapse min-w-225">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/2">
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55">Order</th>
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55">Customer</th>
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55">Location</th>
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55">Items</th>
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55">Total</th>
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55">Status</th>
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-white/30 text-sm font-light italic">No orders logged yet.</td>
                      </tr>
                    ) : (
                      orders.map(order => (
                        <tr key={order.id} className="hover:bg-white/2 transition-colors group">
                          <td className="px-6 py-4 font-mono text-xs text-emerald-400 font-bold">
                            HY-{order.id}
                            <span className="block text-[9px] text-white/35 mt-0.5 font-normal">{order.source.toUpperCase()}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-serif block text-white text-base font-light">{order.customer_name}</span>
                            <span className="block text-xs text-white/40">{order.customer_email}</span>
                            <span className="block text-xs text-white/40">{order.customer_phone}</span>
                          </td>
                          <td className="px-6 py-4 text-xs text-white/70">
                            {order.customer_city}, {order.customer_country}
                          </td>
                          <td className="px-6 py-4 text-xs text-white/60 whitespace-pre-line font-mono leading-relaxed">
                            {order.order_items}
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-green-400">
                            {order.total_amount}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${order.status === "completed" ? "bg-green-500/10 border border-green-500/20 text-green-400" :
                              order.status === "processing" ? "bg-blue-500/10 border border-blue-500/20 text-blue-400" :
                                order.status === "cancelled" ? "bg-red-500/10 border border-red-500/20 text-red-400" :
                                  "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                              }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openOrderModal("edit", order)}
                                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500/20 hover:border-green-500/40 text-white/60 hover:text-white transition-all cursor-pointer"
                                title="Edit Order"
                              >
                                <FaEdit className="text-xs" />
                              </button>
                              <button
                                onClick={() => handleDelete(order.id, "orders")}
                                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/40 text-white/60 hover:text-red-400 transition-all cursor-pointer"
                                title="Delete Order"
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* PRODUCTS TAB */}
              {activeTab === "products" && (
                <table className="w-full text-left border-collapse min-w-175">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/2">
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55">Image</th>
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55">Name</th>
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55">Category</th>
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55">Price</th>
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55">Description</th>
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-white/30 text-sm font-light italic">No products listed.</td>
                      </tr>
                    ) : (
                      products.map(prod => (
                        <tr key={prod.id} className="hover:bg-white/2 transition-colors group">
                          <td className="px-6 py-4">
                            <img src={prod.image} className="w-12 h-12 rounded-xl object-cover border border-white/10" alt={prod.title} />
                          </td>
                          <td className="px-6 py-4 font-serif text-white text-base font-light">
                            {prod.title}
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs text-green-400 bg-green-500/5 border border-green-500/10 px-2.5 py-1 rounded-full">{prod.category}</span>
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-white text-sm">
                            {prod.price}
                          </td>
                          <td className="px-6 py-4 text-xs text-white/50 max-w-sm truncate leading-relaxed">
                            {prod.description}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openProductModal("edit", prod)}
                                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500/20 hover:border-green-500/40 text-white/60 hover:text-white transition-all cursor-pointer"
                                title="Edit Product"
                              >
                                <FaEdit className="text-xs" />
                              </button>
                              <button
                                onClick={() => handleDelete(prod.id, "products")}
                                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/40 text-white/60 hover:text-red-400 transition-all cursor-pointer"
                                title="Delete Product"
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* USERS TAB */}
              {activeTab === "users" && (
                <table className="w-full text-left border-collapse min-w-150">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/2">
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55">User ID</th>
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55">Name</th>
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55">Email Address</th>
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55">Phone Number</th>
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55">Access Role</th>
                      <th className="px-6 py-4 text-[10px] tracking-widest uppercase font-black text-white/55 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-white/30 text-sm font-light italic">No registered users in registry.</td>
                      </tr>
                    ) : (
                      users.map(u => (
                        <tr key={u.id} className="hover:bg-white/2 transition-colors group">
                          <td className="px-6 py-4 font-mono text-xs text-white/40">
                            #{u.id}
                          </td>
                          <td className="px-6 py-4 font-serif text-white text-base font-light">
                            {u.name}
                          </td>
                          <td className="px-6 py-4 text-xs font-mono text-white/70">
                            {u.email}
                          </td>
                          <td className="px-6 py-4 text-xs text-white/50">
                            {u.phone || "—"}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${u.role === "admin"
                              ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                              : "bg-green-500/10 border border-green-500/20 text-green-400"
                              }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openUserModal("edit", u)}
                                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500/20 hover:border-green-500/40 text-white/60 hover:text-white transition-all cursor-pointer"
                                title="Edit User"
                              >
                                <FaEdit className="text-xs" />
                              </button>
                              <button
                                onClick={() => handleDelete(u.id, "users")}
                                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/40 text-white/60 hover:text-red-400 transition-all cursor-pointer"
                                title="Delete User"
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* SETTINGS TAB */}
              {activeTab === "settings" && (
                <div className="max-w-xl mx-auto bg-linear-to-br from-[#0b1f1a]/80 to-[#0e3a2f]/80 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-md space-y-6">
                  <div>
                    <h3 className="text-xl font-serif text-white mb-2">🌿 Hyssop Settings</h3>
                    <p className="text-xs text-white/40 mb-6">Manage global values and administrator security settings for your dashboard.</p>
                  </div>

                  <div className="space-y-6">
                    {/* WhatsApp Setting */}
                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-white/50 block mb-2 font-bold">Storefront WhatsApp Number</label>
                      <input
                        type="text"
                        value={whatsappSetting}
                        onChange={e => setWhatsappSetting(e.target.value)}
                        className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-green-500/50"
                        placeholder="e.g. 251952161260 (country code without +)"
                      />
                      <p className="text-[9px] text-white/30 mt-2 italic leading-relaxed">
                        Enter digits only, including country code (e.g., `251952161260`). Do not include '+' or spaces.
                        This controls checkout redirects and contact inquiries!
                      </p>
                    </div>

                    {/* Admin Credentials Settings */}
                    <div className="border-t border-white/5 pt-6 mt-6 space-y-4">
                      <div>
                        <h4 className="text-sm font-serif text-green-400 mb-1">🔐 Dashboard Security Settings</h4>
                        <p className="text-[10px] text-white/40 mb-4">Modify the username and password used to access the administrator registry.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] tracking-widest uppercase text-white/50 block mb-2 font-bold">Admin Username</label>
                          <input
                            type="text"
                            value={editAdminUser}
                            onChange={e => setEditAdminUser(e.target.value)}
                            className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50"
                            placeholder="Change admin username"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] tracking-widest uppercase text-white/50 block mb-2 font-bold">Admin New Password</label>
                          <input
                            type="password"
                            value={editAdminPass}
                            onChange={e => setEditAdminPass(e.target.value)}
                            className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50"
                            placeholder="•••••••• (leave blank to keep current)"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-white/5 flex justify-end">
                      <button
                        onClick={handleSaveSettings}
                        disabled={savingSettings}
                        className="px-8 py-3.5 bg-green-600 hover:bg-green-500 active:scale-[0.97] disabled:bg-white/5 disabled:text-white/30 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 min-w-40"
                      >
                        💾 {savingSettings ? "Saving Settings..." : "Save All Settings"}
                      </button>
                    </div>

                    {settingsFeedback && (
                      <div className={`p-4 rounded-xl border text-xs ${settingsFeedback.includes("successfully")
                          ? "bg-green-500/10 border-green-500/25 text-green-300"
                          : "bg-red-500/10 border-red-500/25 text-red-300"
                        }`}>
                        {settingsFeedback}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </div>

      {/* ── MODALS ── */}

      {/* 1. ORDER MODAL */}
      {showModal === "order" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-[#0b1f1a] border border-white/10 rounded-[2.5rem] w-full max-w-lg p-8 sm:p-10 shadow-2xl relative">
            <button onClick={() => setShowModal(null)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors cursor-pointer">
              ✕
            </button>
            <h3 className="text-2xl font-serif mb-6 text-green-400">
              {modalMode === "add" ? "Create New Order" : "Modify Order Details"}
            </h3>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <div>
                <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Customer Name</label>
                <input
                  type="text"
                  value={orderForm.customer_name || ""}
                  onChange={e => setOrderForm({ ...orderForm, customer_name: e.target.value })}
                  className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Email</label>
                  <input
                    type="email"
                    value={orderForm.customer_email || ""}
                    onChange={e => setOrderForm({ ...orderForm, customer_email: e.target.value })}
                    className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Phone</label>
                  <input
                    type="text"
                    value={orderForm.customer_phone || ""}
                    onChange={e => setOrderForm({ ...orderForm, customer_phone: e.target.value })}
                    className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Country</label>
                  <input
                    type="text"
                    value={orderForm.customer_country || ""}
                    onChange={e => setOrderForm({ ...orderForm, customer_country: e.target.value })}
                    className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">City</label>
                  <input
                    type="text"
                    value={orderForm.customer_city || ""}
                    onChange={e => setOrderForm({ ...orderForm, customer_city: e.target.value })}
                    className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Order Items (Format: Name × Qty — Price)</label>
                <textarea
                  rows={3}
                  value={orderForm.order_items || ""}
                  onChange={e => setOrderForm({ ...orderForm, order_items: e.target.value })}
                  className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-green-500/50"
                  placeholder="e.g. Ashwagandha × 2 — $22.00"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Total Amount</label>
                  <input
                    type="text"
                    value={orderForm.total_amount || ""}
                    onChange={e => setOrderForm({ ...orderForm, total_amount: e.target.value })}
                    className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Order Status</label>
                  <select
                    value={orderForm.status || "pending"}
                    onChange={e => setOrderForm({ ...orderForm, status: e.target.value as Order["status"] })}
                    className="w-full bg-[#0b1f1a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Notes</label>
                <input
                  type="text"
                  value={orderForm.notes || ""}
                  onChange={e => setOrderForm({ ...orderForm, notes: e.target.value })}
                  className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8 pt-4 border-t border-white/5">
              <button
                onClick={handleSaveOrder}
                className="flex-1 py-4 bg-green-600 hover:bg-green-500 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl cursor-pointer transition-all shadow-lg"
              >
                Save Order Record
              </button>
              <button
                onClick={() => setShowModal(null)}
                className="px-6 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-black uppercase text-[10px] tracking-widest rounded-2xl cursor-pointer transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCT MODAL */}
      {showModal === "product" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-[#0b1f1a] border border-white/10 rounded-[2.5rem] w-full max-w-lg p-8 sm:p-10 shadow-2xl relative">
            <button onClick={() => setShowModal(null)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors cursor-pointer">
              ✕
            </button>
            <h3 className="text-2xl font-serif mb-6 text-green-400">
              {modalMode === "add" ? "List New Botanical Product" : "Modify Product Properties"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Product Title</label>
                <input
                  type="text"
                  value={productForm.title || ""}
                  onChange={e => setProductForm({ ...productForm, title: e.target.value })}
                  className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50"
                  placeholder="e.g. Organic Peppermint Tea"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Price (with symbol)</label>
                  <input
                    type="text"
                    value={productForm.price || ""}
                    onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50"
                    placeholder="e.g. $14.00"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Category</label>
                  <select
                    value={productForm.category || "Medicinal Herbs"}
                    onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-[#0b1f1a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50"
                  >
                    <option value="Medicinal Herbs">Medicinal Herbs</option>
                    <option value="Essential Resins">Essential Resins</option>
                    <option value="Wellness Blends">Wellness Blends</option>
                    <option value="Dynamic Tonics">Dynamic Tonics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Product Image</label>
                <div className="space-y-3">
                  {productForm.image && (
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                      <img src={productForm.image} className="w-full h-full object-cover" alt="Product preview" />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={productForm.image || ""}
                      onChange={e => setProductForm({ ...productForm, image: e.target.value })}
                      className="flex-1 bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-green-500/50 text-white placeholder-white/20"
                      placeholder="e.g. /images/product1.jpg or external https:// link"
                    />
                    <label className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-[10px] uppercase font-black tracking-widest flex items-center justify-center cursor-pointer transition-all text-white shrink-0 active:scale-95">
                      {uploadingImg ? "Uploading..." : "Upload File"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingImg}
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  value={productForm.description || ""}
                  onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50"
                  placeholder="Provide therapeutic and usage information..."
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8 pt-4 border-t border-white/5">
              <button
                onClick={handleSaveProduct}
                className="flex-1 py-4 bg-green-600 hover:bg-green-500 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl cursor-pointer transition-all shadow-lg"
              >
                Publish Product
              </button>
              <button
                onClick={() => setShowModal(null)}
                className="px-6 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-black uppercase text-[10px] tracking-widest rounded-2xl cursor-pointer transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. USER MODAL */}
      {showModal === "user" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-[#0b1f1a] border border-white/10 rounded-[2.5rem] w-full max-w-lg p-8 sm:p-10 shadow-2xl relative">
            <button onClick={() => setShowModal(null)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors cursor-pointer">
              ✕
            </button>
            <h3 className="text-2xl font-serif mb-6 text-green-400">
              {modalMode === "add" ? "Register New User" : "Modify User Permissions"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={userForm.name || ""}
                  onChange={e => setUserForm({ ...userForm, name: e.target.value })}
                  className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={userForm.email || ""}
                  onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={userForm.phone || ""}
                    onChange={e => setUserForm({ ...userForm, phone: e.target.value })}
                    className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-white/45 block mb-1">Role / Permissions</label>
                  <select
                    value={userForm.role || "customer"}
                    onChange={e => setUserForm({ ...userForm, role: e.target.value as User["role"] })}
                    className="w-full bg-[#0b1f1a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50"
                  >
                    <option value="customer">Customer (Standard)</option>
                    <option value="admin">Administrator (Manager)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8 pt-4 border-t border-white/5">
              <button
                onClick={handleSaveUser}
                className="flex-1 py-4 bg-green-600 hover:bg-green-500 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl cursor-pointer transition-all shadow-lg"
              >
                Save User Profile
              </button>
              <button
                onClick={() => setShowModal(null)}
                className="px-6 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-black uppercase text-[10px] tracking-widest rounded-2xl cursor-pointer transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styled Custom Scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.3);
        }
      `}</style>
    </div>
  );
}
