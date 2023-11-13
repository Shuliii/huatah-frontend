import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activeBetActions } from "../store/activeBet-slice";

import Header from "../components/Header";

const RootLayout = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    async function getActive() {
      const response = await fetch(
        `https://test-express-5gi8.onrender.com/active/${profile}`
      );
      const resData = await response.json();
      dispatch(activeBetActions.replaceData({ item: resData.data }));
    }

    getActive();
  }, [profile, dispatch, cart]);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
