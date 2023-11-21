import {useEffect} from "react";

export default function useDebouncedEffect(effect, deps, delay) {
  useEffect(() => {
    const handler = setTimeout(() => {
      effect();
    }, delay);

    // Cleanup function
    return () => clearTimeout(handler);
  }, [...deps, delay]); // Ensure the effect runs when dependencies or delay change
}
