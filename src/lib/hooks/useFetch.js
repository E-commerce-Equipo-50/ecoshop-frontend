import { useState, useEffect } from "react";

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    let ignore = false;
    const controller = new AbortController(); // permite cancelar la request

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url, {
          ...options,
          signal: controller.signal, // por si desmonta el componente
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
          }
        });

        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const json = await res.json();

        if (!ignore) setData(json);
      } catch (err) {
        if (!ignore) setError(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
}
