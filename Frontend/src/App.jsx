import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await axios.get(`api/products?search=${Search}`, {
          signal: controller.signal,
        });
        console.log("response", response);
        setProducts(response?.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("request cancel ", error.message);
          return;
        }
        setError(true);
        setLoading(false);
      } finally {
        setError(false);
        setLoading(false);
      }
    })();
    return () => {
      controller.abort();
    };
  }, [Search]);

  // const { products, error, Loading } = CustomReactQuery("/api/products");
  return (
    <>
      <h1>Vite + React</h1>
      <input
        value={Search}
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder=" search "
      />
      <button onClick={() => setSearch("")}>clear</button>
      <h2>
        Number of products are:-
        {(Loading && <p>Loading ...</p>) || products?.length}{" "}
      </h2>
      {error && <p style={{ color: "red" }}>some thing went wrong</p>}
      {products?.length > 0 &&
        products.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "1px",
              border: "solid 1px white",
              borderRadius: "1rem",
              marginBottom: "10px",
            }}
          >
            <p>name:-{item.name}</p>
          </div>
        ))}
      {/* {Loading && <p>Loading ...</p>} */}
    </>
  );
}

export default App;

// const CustomReactQuery = (urlpath) => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(false);
//   const [Loading, setLoading] = useState(false);
//   useEffect(() => {
//     (async () => {
//       try {
//         setError(false);
//         setLoading(true);
//         const response = await axios.get(urlpath);
//         console.log("response", response);
//         setProducts(response?.data);
//         setLoading(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       } finally {
//         setError(false);
//         setLoading(false);
//       }
//     })();
//   }, []);
//   return {
//     products,
//     error,
//     Loading,
//   };
// };
