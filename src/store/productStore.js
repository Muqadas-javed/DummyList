import { create } from 'zustand';
import axios from 'axios';

export const useProductStore = create((set) => ({
    products: [],
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('https://fakestoreapi.com/products?limit=10');
            // Transform the data to match our needs
            const transformedProducts = response.data.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                image: item.image,
                color: item.color || 'gray', // Assign default color if none exists
                discount: Math.floor(Math.random() * 20), // Simulate discount field (0 to 20%)
                category: item.category,
            }));
            set({ products: transformedProducts, loading: false });
        } catch (error) {
            set({ error: 'Failed to load products', loading: false });
        }
    },

    setProducts: (products) => set({ products }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));
