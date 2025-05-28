import { create } from "zustand";

// Define the store type
type AnimationStore = {
  value: number;
  setValue: (newValue: number) => void;
  increase: () => void;
  decrease: () => void;
};

const useAnimationStore = create<AnimationStore>((set) => ({
  value: 0, // Initial number

  setValue: (newValue) => set({ value: newValue }), // Update value

  increase: () => set((state) => ({ value: state.value + 1 })), // Increment
  decrease: () => set((state) => ({ value: state.value - 1 })), // Decrement
}));

export default useAnimationStore;
