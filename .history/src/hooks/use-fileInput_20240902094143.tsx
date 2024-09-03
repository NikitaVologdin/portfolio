"use client";
import { useState, useEffect } from "react";

interface props {
  validator: (value: string) => boolean;
}

export default function useInput(validator: any) {
  const [value, setValue] = useState<File[] | null | { name: string }[]>(null);
  const [isTouched, setIsTouched] = useState(false);
  const [hasError, setHasError] = useState(false);
  const valueIsValid = validator(value);
  useEffect(() => {
    if (!valueIsValid && isTouched) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [valueIsValid, isTouched, setHasError]);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files !== null) {
      const value = Array.from(event.target.files);
      if (value.length > 0) {
        setIsTouched(true);
      }
      return setValue(value);
    }
    return;
  }

  function blurHandler(
    event: React.FocusEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) {
    setIsTouched(true);
  }

  function reset() {
    setValue(null);
    setIsTouched(false);
    setHasError(false);
  }

  return {
    value,
    setValue,
    valueIsValid,
    isTouched,
    setIsTouched,
    hasError,
    setHasError,
    changeHandler,
    blurHandler,
    reset,
  };
}
