import useCartStore from "../store/useCartStore";

function Navbar({ onToggleCart, isCartOpen }) {
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xl font-bold tracking-tight text-slate-900">
            ShopEase
          </p>
        </div>

        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <a href="#" className="transition hover:text-slate-900">
            Home
          </a>
          <a href="#" className="transition hover:text-slate-900">
            Shop
          </a>
          {/* <a href="#" className="transition hover:text-slate-900">
            Deals
          </a> */}

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

export default Navbar;
