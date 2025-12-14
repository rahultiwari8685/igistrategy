import { create } from 'zustand';

export const useReportStore = create((set) => ({
    filters: {},
    list: [],

    setFilters: (data) =>
        set((state) => ({
            filters: { ...state.filters, ...data }
        })),

    setList: (newList) => set({ list: newList }),
}));
