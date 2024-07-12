import { useState, useEffect } from "react";

export default function useCheckboxes<T>() {
  const [selectedChecks, setSelectedChecks] = useState<T[]>([]);
  const [isTouched, setIsTouched] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isValid = selectedChecks.length > 0;

  useEffect(() => {
    if (selectedChecks.length > 0) {
      setIsTouched(true);
    }
    if (isTouched && !isValid) {
      setHasError(true);
    }

    if (isTouched && isValid) {
      setHasError(false);
    }
  }, [setIsTouched, setHasError, isValid, isTouched, selectedChecks.length]);

  const changeHandler = (name: T) => {
    const selected = [...selectedChecks];
    const find = selected.indexOf(name);
    if (find > -1) {
      selected.splice(find, 1);
    } else {
      selected.push(name);
    }
    setSelectedChecks([...selected]);
  };

  return {
    selectedChecks,
    setSelectedChecks,
    isTouched,
    setIsTouched,
    hasError,
    setHasError,
    changeHandler,
    isValid,
  };
}
