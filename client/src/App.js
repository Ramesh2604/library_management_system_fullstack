import { HashRouter,Routes,Route } from "react-router-dom";
import Home from "./home";
import Checkout from "./checkout";
import BookEntry from "./bookentry";
import Bookdetails from "./bookdetails";
import Checkoutsheet from "./checkoutsheet";
import BookReturn from "./bookreturn";
export default function App(){


  return(<>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/bookentry" element={<BookEntry/>}></Route>
        <Route path="/bookdetails" element={<Bookdetails />}></Route>
        <Route path="/checkoutsheet" element={<Checkoutsheet />}></Route>
        <Route path="/bookreturn" element={<BookReturn />}></Route>
      </Routes>
    </HashRouter>
  </>)
}