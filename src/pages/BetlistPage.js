import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getBets } from "../util/http";

import BetList from "../components/Betlist";

const BetlistPage = () => {
  const { name } = useParams();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["bets", name],
    queryFn: () => getBets(name),
    staleTime: 5000,
    gcTime: 600000,
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
    // const { data } = useLoaderData();
    return <BetList data={data} />;
  }
};

export default BetlistPage;

// import { useLoaderData, useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getBets } from "../util/http";
// import BetList from "../components/Betlist";

// const BetlistPage = () => {
//   const { name } = useParams();

//   const { data, error, isError, isLoading } = useQuery({
//     queryKey: ["bets", name],
//     queryFn: getBets,
//   });

//   console.log(data, error);

//   if (isLoading) {
//     // You can render a loading indicator here if needed
//     return <p>Loading...</p>;
//   }

//   if (isError) {
//     // You can render an error message or handle the error
//     return <p>Error loading data: {error.message}</p>;
//   }

//   return <BetList data={data} />;
// };

// export default BetlistPage;
