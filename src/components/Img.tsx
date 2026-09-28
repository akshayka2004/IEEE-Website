"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Img({ className, onLoad, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) {
      const id = requestAnimationFrame(() => setLoaded(true));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  return (
    <Image
      {...props}
      alt={alt}
      ref={ref}
      className={`img-fade${loaded ? " is-loaded" : ""}${className ? ` ${className}` : ""}`}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}
