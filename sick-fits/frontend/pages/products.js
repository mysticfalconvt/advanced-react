import Pagination from "../components/Pagination";
import Products from "../components/Products";

export default function productPage() {
  return (
    <div>
      <Pagination page={1}>
        <Products />
      </Pagination>
    </div>
  );
}
