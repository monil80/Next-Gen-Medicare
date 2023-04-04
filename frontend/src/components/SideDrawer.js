import "../styles/SideDrawer.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const SideDrawer = ({ show, click }) => {
  const sideDrawerClass = ["sidedrawer"];

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  let check = useSelector((state) => state.user);

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  if (show) {
    sideDrawerClass.push("show");
  }

  const [user, setUser] = useState("");

  useEffect(() => {
    if (check.check) {
      setUser("LOG OUT");
    } else {
      setUser("SIGN IN");
    }
  }, [check]);

  return (
    <div className={sideDrawerClass.join(" ")}>
      <ul className="sidedrawer__links" onClick={click}>
        <li>
          <Link to="/login"> {user} </Link>
        </li>
        <li>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart{" "}
              <span className="sidedrawer__cartbadge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/allProducts">Products</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
