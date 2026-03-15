import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { manualIngredientsLoaded } from "../actions";
import { createLogger } from "../logger";

const logger = createLogger("useManualIngredients");

function useManualIngredients() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/manual-ingredients.json")
      .then((r) => {
        if (r.status === 404) return null;
        if (!r.ok) throw new Error(`Unexpected status ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (data !== null) {
          dispatch(manualIngredientsLoaded(data));
        }
      })
      .catch((err) => {
        logger.warn("Failed to load:", err);
      });
  }, [dispatch]);
}

export default useManualIngredients;
