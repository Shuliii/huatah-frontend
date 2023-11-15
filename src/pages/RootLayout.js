import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { getBalance, getSummary } from "../util/http";
import { activeBetActions } from "../store/activeBet-slice";
import { summaryActions } from "../store/summary-slice";

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

    // async function getSummary() {
    //   const response = await fetch(
    //     `https://test-express-5gi8.onrender.com/summary/${profile}`
    //   );
    //   const resData = await response.json();
    //   dispatch(summaryActions.replaceData({ item: resData.data }));
    // }

    // async function getBalance() {
    //   const response = await fetch(
    //     `https://test-express-5gi8.onrender.com/balance/${profile}`
    //   );
    //   const resData = await response.json();
    //   dispatch(summaryActions.replaceBalance({ item: resData.data }));
    // }

    getActive();
  }, [profile, dispatch, cart]);

  const {
    data: summaryData,
    isLoading: summaryIsLoading,
    isError: summaryIsError,
    error: summaryError,
  } = useQuery({
    queryKey: ["summary", profile],
    queryFn: () => getSummary(profile),
    refetchInterval: 30000,
  });

  const {
    data: balanceData,
    isLoading: balanceIsLoading,
    isError: balanceIsError,
    error: balanceError,
  } = useQuery({
    queryKey: ["balance", profile],
    queryFn: () => getBalance(profile),
    refetchInterval: 30000,
  });

  useEffect(() => {
    if (balanceData) {
      dispatch(summaryActions.replaceBalance({ item: balanceData }));
    }

    if (summaryData) {
      dispatch(summaryActions.replaceData({ item: summaryData.data }));
    }
  }, [balanceData, summaryData, dispatch]);

  if (balanceIsLoading || summaryIsLoading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (balanceIsError || summaryIsError) {
    return (
      <p style={{ textAlign: "center" }}>
        Error loading data: {summaryError.message}
        Error loading data: {balanceError.message}
      </p>
    );
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
