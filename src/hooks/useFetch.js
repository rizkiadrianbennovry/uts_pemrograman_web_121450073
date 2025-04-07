import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return { data, loading };
}

export default useFetch;