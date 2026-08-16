import useCartStore from "../store/useCartStore";

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
        <div className="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">
          Your cart is empty.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 bg--50 p-3"
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
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Cart;
