import { useLoaderData } from "react-router-dom";

import BetList from "../components/Betlist";

const BetlistPage = () => {
  const { data } = useLoaderData();
  return <BetList data={data} />;
};

export default BetlistPage;

export async function loader({ params }) {
  const response = await fetch(
    `https://test-express-5gi8.onrender.com/${params.name}`
  );
  const resData = await response.json();
  return resData;
}
