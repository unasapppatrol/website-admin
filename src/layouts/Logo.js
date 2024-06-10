import { Link } from "react-router-dom";
import logo_product from "../assets/images/logos/logo_product.png";

const Logo = () => {
  return (
    <Link to="/" className="d-flex align-items-center">
      <img src={logo_product} alt="logo_product" width={200} height={50} />
    </Link>
  );
};

export default Logo;
