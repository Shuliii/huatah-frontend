import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { authActions } from "../store/auth-slice";
import { cartActions } from "../store/cart-slice";
import { activeBetActions } from "../store/activeBet-slice";
import { summaryActions } from "../store/summary-slice";

import { getBalance, getSummary, getActive } from "../util/http";
import Modal from "../components/UI/Modal";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RootLayout = () => {
  const dispatch = useDispatch();
  const [hasError, setError] = useState("");
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

  // console.log(balanceData, summaryData, activeData);
  // const summaryHelper = summaryData.data;
  // console.log(summaryHelper);

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

  useEffect(() => {
    if (profile) {
      if (!activeData || activeData.message !== "token expired") {
        setError(""); // Clear lingering error when profile is set and no token expiration
      }
    }
  }, [profile, activeData]);

  useEffect(() => {
    if (activeData && activeData.message === "token expired") {
      setError("Please relogin");
    }
  }, [activeData]);

  if (balanceIsLoading || summaryIsLoading || activeIsLoading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
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

  const closeHandler = () => {
    dispatch(cartActions.removeAllCart());
    dispatch(authActions.logOut());
    dispatch(activeBetActions.removeData());
    dispatch(summaryActions.removeData());
    setError("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    document.body.style.overflow = "unset";
  };

  const modalContent = {
    display: "flex",
    flexDirection: "column",
    padding: "32px",
    gap: "32px",
    textAlign: "center",
  };

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {hasError && (
        <Modal onClose={closeHandler}>
          {/* <div className={styles.modalContent}>{hasError}</div> */}
          <div style={modalContent}>{hasError}</div>
        </Modal>
      )}
    </>
  );
};

export default RootLayout;
