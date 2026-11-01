import { useParams } from "react-router-dom";
import ComingSoon from "../components/common/ComingSoon";

export default function Edit() {
  const { id } = useParams();

  return (
    <ComingSoon
      title="Edit Product"
      icon="fa-solid fa-pen-to-square"
      description={`Update product information and inventory${id ? ` for product ${id}` : ""}. The editing form and save functionality will be implemented soon.`}
    />
  );
}
