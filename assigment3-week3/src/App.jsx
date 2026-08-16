import { useEffect, useMemo, useState } from "react";
import useCartStore from "./store/useCartStore";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading, error };
}

function Navbar({ currentPage, onNavigate, onToggleCart }) {
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const navItemClass = (page) =>
    `rounded-full px-3 py-2 text-sm font-medium transition ${
      currentPage === page
        ? "bg-slate-900 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xl font-bold tracking-tight text-slate-900">
            ShopEase
          </p>
        </div>

        <nav className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className={navItemClass("home")}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate("shop")}
            className={navItemClass("shop")}
          >
            Shop
          </button>

          <button
            type="button"
            onClick={onToggleCart}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-white shadow-sm transition hover:bg-slate-700"
            aria-label="Toggle cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <circle cx="9" cy="19" r="1.5" />
              <circle cx="17" cy="19" r="1.5" />
              <path d="M3 4h2l2.2 9.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L19 7H7" />
            </svg>
            <span>Cart</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-semibold text-slate-900">
              {itemCount}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}

function ProductCard({ product, onOpen }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
      onClick={() => onOpen(product)}
    >
      <div className="h-52 overflow-hidden bg-slate-100">
        <img
          src={
            product.images?.[0] ||
            "https://via.placeholder.com/400x300?text=Product"
          }
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
              {product.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {product.category?.name || "General"}
            </p>
          </div>
          <span className="text-lg font-bold text-green-700">
            ${product.price}
          </span>
        </div>

        <p className="line-clamp-3 text-sm text-slate-600">
          {product.description}
        </p>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            addItem(product);
          }}
          className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

function getGenderFromProduct(product) {
  const text =
    `${product.title || ""} ${product.category?.name || ""} ${product.description || ""}`.toLowerCase();

  if (text.includes("men") || text.includes("male")) return "Men";
  if (text.includes("women") || text.includes("female")) return "Women";
  return "Unisex";
}

function ProductGrid({ search, minPrice, maxPrice, gender, onOpenProduct }) {
  const { products, loading, error } = useProducts();

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        [product.title, product.description, product.category?.name]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query));

      const price = Number(product.price) || 0;
      const matchesMin = minPrice === "" || price >= Number(minPrice);
      const matchesMax = maxPrice === "" || price <= Number(maxPrice);

      const productGender = getGenderFromProduct(product);
      const matchesGender = gender === "All" || productGender === gender;

      return matchesSearch && matchesMin && matchesMax && matchesGender;
    });
  }, [products, search, minPrice, maxPrice, gender]);

  if (loading) {
    return (
      <section className="flex min-h-[240px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-slate-500 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
          <span className="text-sm font-medium">Loading products...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-600 shadow-sm">
        {error}
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Featured products</h2>
        <span className="text-sm text-slate-500">
          {filteredProducts.length} items
        </span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          No products match your current filters.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={onOpenProduct}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function Cart({ isOpen = true }) {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.getTotalPrice());

  return (
    <aside
      className={[
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6",
        isOpen ? "block" : "hidden",
      ].join(" ")}
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Cart</h2>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-slate-400 shadow-sm">
            🛒
          </div>
          <p className="text-base font-medium text-slate-700">
            Your cart is empty
          </p>
          <p className="mt-1">Add some products to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    item.images?.[0] ||
                    "https://via.placeholder.com/80x80?text=Item"
                  }
                  alt={item.title || item.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-800">
                    {item.title || item.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    ${(Number(item.price) || 0).toFixed(2)} each
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex items-center rounded-lg border border-slate-200 bg-white">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-8 w-8 text-lg text-slate-700 transition hover:bg-slate-100"
                    aria-label={`Decrease quantity of ${item.title || item.name}`}
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center text-sm font-medium text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 text-lg text-slate-700 transition hover:bg-slate-100"
                    aria-label={`Increase quantity of ${item.title || item.name}`}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-sm font-medium text-red-500 transition hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between text-lg font-semibold text-slate-900">
              <span>Total</span>
              <span className="text-green-700">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

function ProductFilters({
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  gender,
  setGender,
}) {
  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Search
          </span>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Min price
          </span>
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            placeholder="0"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Max price
          </span>
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            placeholder="500"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Gender
          </span>
          <select
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:bg-white"
          >
            <option value="All">All</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </label>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl font-medium text-slate-700 shadow-sm transition hover:bg-white"
          aria-label="Close product details"
        >
          ×
        </button>

        <div className="grid md:grid-cols-2">
          <div className="h-80 bg-slate-100 md:h-full">
            <img
              src={
                product.images?.[0] ||
                "https://via.placeholder.com/800x800?text=Product"
              }
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-5 p-6 md:p-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                {product.category?.name || "Product"}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {product.title}
              </h2>
            </div>

            <div className="text-3xl font-bold text-slate-900">
              ${product.price}
            </div>

            <p className="text-base leading-7 text-slate-600">
              {product.description}
            </p>

            <button
              type="button"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="w-full rounded-xl bg-slate-900 px-5 py-3 text-base font-medium text-white transition hover:bg-slate-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white shadow-xl">
        <div className="grid gap-8 px-6 py-10 md:grid-cols-2 md:px-10 lg:px-12">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
              New season arrival
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              Fresh essentials for everyday living.
            </h1>
            <p className="mt-5 max-w-lg text-base text-slate-200 md:text-lg">
              ShopEase brings together modern essentials, smart finds, and
              quality pieces designed for your daily routine.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="grid w-full max-w-md gap-4 rounded-3xl bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
                <div>
                  <p className="text-sm text-slate-300">Curated picks</p>
                  <p className="text-2xl font-bold">1.2k+</p>
                </div>
                <div className="text-3xl">✨</div>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
                <div>
                  <p className="text-sm text-slate-300">Happy shoppers</p>
                  <p className="text-2xl font-bold">98%</p>
                </div>
                <div className="text-3xl">💬</div>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
                <div>
                  <p className="text-sm text-slate-300">Fast delivery</p>
                  <p className="text-2xl font-bold">24h</p>
                </div>
                <div className="text-3xl">🚚</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Thoughtful design",
            text: "Minimal, modern pieces that simplify your day and elevate your space.",
            icon: "🎯",
          },
          {
            title: "Good value",
            text: "Premium quality without the luxury markup, for everyday confidence.",
            icon: "💸",
          },
          {
            title: "Quick checkout",
            text: "A seamless shopping flow that keeps your cart organized and ready to go.",
            icon: "⚡",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-3 text-3xl">{item.icon}</div>
            <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function ShopPage({
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  gender,
  setGender,
  isCartOpen,
  setIsCartOpen,
  setSelectedProduct,
}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ProductFilters
        search={search}
        setSearch={setSearch}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        gender={gender}
        setGender={setGender}
      />

      <div className="grid gap-8 lg:grid-cols-[1.7fr_0.9fr]">
        <div className="min-w-0">
          <ProductGrid
            search={search}
            minPrice={minPrice}
            maxPrice={maxPrice}
            gender={gender}
            onOpenProduct={setSelectedProduct}
          />
        </div>

        <div className="min-w-0">
          <Cart isOpen={isCartOpen} />
        </div>
      </div>
    </main>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isCartOpen, setIsCartOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [gender, setGender] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onToggleCart={() => setIsCartOpen((prev) => !prev)}
        isCartOpen={isCartOpen}
      />

      {currentPage === "home" ? (
        <HomePage />
      ) : (
        <ShopPage
          search={search}
          setSearch={setSearch}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          gender={gender}
          setGender={setGender}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          setSelectedProduct={setSelectedProduct}
        />
      )}

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product) => addItem(product)}
      />
    </div>
  );
}

export default App;
