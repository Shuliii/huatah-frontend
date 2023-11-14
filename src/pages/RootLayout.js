import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { getBalance } from "../util/http";
import { activeBetActions } from "../store/activeBet-slice";
import { summaryActions } from "../store/summary-slice";

import Header from "../components/Header";

const RootLayout = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const cart = useSelector((state) => state.cart.cart);
  const summary = useSelector((state) => state.summary.balance);
  console.log(summary);

  useEffect(() => {
    async function getActive() {
      const response = await fetch(
        `https://test-express-5gi8.onrender.com/active/${profile}`
      );
      const resData = await response.json();
      dispatch(activeBetActions.replaceData({ item: resData.data }));
    }

    async function getSummary() {
      const response = await fetch(
        `https://test-express-5gi8.onrender.com/summary/${profile}`
      );
      const resData = await response.json();
      dispatch(summaryActions.replaceData({ item: resData.data }));
    }

    // async function getBalance() {
    //   const response = await fetch(
    //     `https://test-express-5gi8.onrender.com/balance/${profile}`
    //   );
    //   const resData = await response.json();
    //   dispatch(summaryActions.replaceBalance({ item: resData.data }));
    // }

    getActive();
    getSummary();
    // getBalance();
  }, [profile, dispatch, cart]);

  const {
    data: balanceData,
    isLoading,
    isSuccess,
    isError,
    error: balanceError,
  } = useQuery({
    queryKey: ["balance", profile],
    queryFn: () => getBalance(profile),
    // onSuccess: consoleLog,
    // dispatch(summaryActions.replaceBalance({ item: data }));
  });
  if (isLoading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (isError) {
    return (
      <p style={{ textAlign: "center" }}>
        Error loading data: {balanceError.message}
      </p>
    );
  }

  if (isSuccess) {
    dispatch(summaryActions.replaceBalance({ item: balanceData }));
  }

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
