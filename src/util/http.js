import { useSelector, useDispatch } from "react-redux";
import { summaryActions } from "../store/summary-slice";

export async function getBets(name) {
  try {
    const url = `https://test-express-5gi8.onrender.com/${name}`;
    const response = await fetch(url);

    if (!response.ok) {
      const error = new Error("An error occured while fetching the events");
      console.error(`Request failed with status ${response.status}`);
      throw error;
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getBalance(profile) {
  const response = await fetch(
    `https://test-express-5gi8.onrender.com/balance/${profile}`
  );

  if (!response.ok) {
    const error = new Error("An error occured while fetching the events");
    console.error(`Request failed with status ${response.status}`);
    throw error;
  }

  const { data } = await response.json();
  const balance = data[0].balance;
  //   const dispatch = useDispatch();
  //   dispatch(summaryActions.replaceBalance({ item: balance }));
  return balance;
}
