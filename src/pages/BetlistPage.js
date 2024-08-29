import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getBets } from "../util/http";

import BetList from "../components/Betlist";

const BetlistPage = () => {
  const { name } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["bets", name],
    queryFn: () => getBets(name),
    staleTime: 5000,
    gcTime: 600000,
    refetchInterval: 30000,
  });

  if (isLoading) {
    // You can render a loading indicator here if needed
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (isError) {
    // You can render an error message or handle the error
    return (
      <p style={{ textAlign: "center" }}>Error loading data: {error.message}</p>
    );
  }

  if (data) {
    return <BetList data={data} />;
  }
};

export default BetlistPage;
