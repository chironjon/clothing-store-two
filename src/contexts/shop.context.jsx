import { createContext, useState, useEffect } from "react";

import SHOP_DATA from '../shop-data.json';

export const ShopContext = createContext({
  shop: []
});

export const ShopProvider = ({ children }) => {
  const [shop, setShop] = useState(SHOP_DATA);
  const value = { shop }
  console.log(ShopContext._currentValue)

  return (
    <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
  )
}