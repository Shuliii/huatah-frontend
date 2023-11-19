import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { getBalance, getSummary, getActive } from "../util/http";
import { activeBetActions } from "../store/activeBet-slice";
import { summaryActions } from "../store/summary-slice";

import Header from "../components/Header";
import Footer from "../components/Footer";

const RootLayout = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);

  const {
    data: activeData,
    isLoading: activeIsLoading,
    isError: activeIsError,
    error: activeError,
  } = useQuery({
    queryKey: ["active", profile],
    queryFn: () => getActive(profile),
    refetchInterval: 30000,
    enabled: profile !== null,
  });

  const {
    data: summaryData,
    isLoading: summaryIsLoading,
    isError: summaryIsError,
    error: summaryError,
  } = useQuery({
    queryKey: ["summary", profile],
    queryFn: () => getSummary(profile),
    refetchInterval: 30000,
    enabled: profile !== null,
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
    enabled: profile !== null,
  });

  useEffect(() => {
    if (balanceData) {
      dispatch(summaryActions.replaceBalance({ item: balanceData }));
    }

    if (summaryData) {
      dispatch(summaryActions.replaceData({ item: summaryData.data }));
    }

    if (activeData) {
      dispatch(activeBetActions.replaceData({ item: activeData.data }));
    }
  }, [balanceData, summaryData, activeData, dispatch]);

  if (balanceIsLoading || summaryIsLoading || activeIsLoading) {
    return (
      <p style={{ textAlign: "center" }}>
        Error loading data:
        <br />
        Summary: {summaryIsLoading}
        <br />
        Balance: {balanceIsLoading}
        <br />
        Active: {activeIsLoading}
      </p>
    );
  }

  if (balanceIsError || summaryIsError || activeIsError) {
    return (
      <p style={{ textAlign: "center" }}>
        Error loading data:
        <br />
        Summary: {summaryError && summaryError.message}
        <br />
        Balance: {balanceError && balanceError.message}
        <br />
        Active: {activeError && activeError.message}
      </p>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
