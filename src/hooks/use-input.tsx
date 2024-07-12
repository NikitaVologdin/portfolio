"use client";
import { useState, useEffect } from "react";

interface props {
  validator: (value: string) => boolean;
}

export default function useInput(validator: any) {
  const [value, setValue] = useState("");
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

  function changeHandler(
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) {
    const value = event.target.value;
    return setValue(value);
  }

  function blurHandler(
    event: React.FocusEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) {
    setIsTouched(true);
  }

  function reset() {
    setValue("");
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
