import { useEffect, useState } from "react";

const useFetch = (fetchUrl) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => setData(data.dummy));
  }, [fetchUrl]);
  return [data];
};

export default useFetch;
