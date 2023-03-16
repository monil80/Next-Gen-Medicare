import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
//import { getcart} from "../redux/actions/cartActions";

const Navbar = ({ click }) => {

 // const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
     // dispatch(getcart())
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  let usercheck=false;
  

  if (localStorage.getItem('auth-token')) {
          usercheck=true
  }

  return (

   
    <nav className="navbar navbar-expand-lg navbar-dark ">
      
      
    
      <Link to="/" className="">
        <span className="logo">
          <img src="https://i.postimg.cc/yxsNfCFW/logo.jpg" style={{ height: "60px", width: "90px" }} alt="" className="img-fluid rounded mx-auto d-block img-thumbnail" />
        </span>

      </Link>


      <ul className="navbar__links">

        <li>
          <Link to="/" className="">
            <span>
              Home
            </span>
          </Link>
        </li>
        <li>
          <Link to="/allProducts" className="">
            <span>
              Products
            </span>
          </Link>
        </li>
        <li>
          <Link to="/about" className="">
            <span>
              About Us
            </span>
          </Link>
        </li>
        <li>
          <Link to="/contact" className="">
            <span>
              Contact Us
            </span>
          </Link>
        </li>
      </ul>


      <ul className="navbar__links">
      <li>
         
          <Link to="/login" className="cart__link">
           
            <span className="text-center">
            { (usercheck && "LOG OUT")||(!usercheck && "SIGN IN") } 
            </span>
          </Link>
        </li>
       

        <li>
         
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
        <li>

        </li>
       
       
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
