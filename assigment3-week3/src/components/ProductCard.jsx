import useCartStore from "../store/useCartStore";

function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
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
          <span className="text-lg font-bold text-slate-900">
            ${product.price}
          </span>
        </div>

        <p className="line-clamp-3 text-sm text-slate-600">
          {product.description}
        </p>

        <button
          type="button"
          onClick={() => addItem(product)}
          className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
