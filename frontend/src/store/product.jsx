import { create } from "zustand";

export const useProductStore = create((set, get) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.Image || !newProduct.price || !newProduct.description) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		// Optionally, refetch all products for consistency
		await get().fetchProducts();
		return { success: true, message: "Product created successfully" };
	},
	fetchProducts: async () => {
		const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
		const data = await res.json();
		set({ products: data.products });
	},
	deleteProduct: async (pid) => {
		const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// Robust: always refetch products after delete
		await get().fetchProducts();
		return { success: true, message: data.message };
	},
	updateProduct: async (pid, updatedProduct) => {
		const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// Optionally, refetch all products for consistency
		await get().fetchProducts();
		return { success: true, message: data.message };
	},
}));