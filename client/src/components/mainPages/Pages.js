// Public Libraries
import React from "react";
import { Switch, Route } from "react-router-dom";
// Private Libraries
import Products from "./products/Products";
import DetailProduct from "./detailProduct/DetailProduct";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import NotFound from "./utils/notfound/NotFound";
// Pages elements
export default function Pages() {
  return (
    <Switch>
      {/* Page elements  */}
      <Route path="/" exact component={Products} />
      <Route path="/detail/:id" exact component={DetailProduct} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/cart" exact component={Cart} />
      {/* Not Found */}
      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}
