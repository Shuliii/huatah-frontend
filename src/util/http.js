import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function getBets(name) {
  try {
    //https://test-express-5gi8.onrender.com/${name}
    //http://localhost:3030/${name}
    const url = `http://47.128.95.51:3030/${name}`;
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
  const response = await fetch(`http://47.128.95.51:3030/balance/${profile}`);
  if (!response.ok) {
    const error = new Error("An error occured while fetching the events");
    console.error(`Request failed with status ${response.status}`);
    throw error;
  }

  const { data } = await response.json();
  const balance = data ? data[0].balance : "0.00";

  return balance;
}

export async function getSummary(profile) {
  const response = await fetch(`http://47.128.95.51:3030/summary/${profile}`);

  if (!response.ok) {
    const error = new Error("An error occured while fetching the events");
    console.error(`Request failed with status ${response.status}`);
    throw error;
  }

  const resData = await response.json();
  return resData;
}

export async function getActive(profile) {
  const response = await fetch(`http://47.128.95.51:3030/active/${profile}`);

  if (!response.ok) {
    const error = new Error("An error occured while fetching the events");
    console.error(`Request failed with status ${response.status}`);
    throw error;
  }
  const resData = await response.json();
  return resData;
}

export async function postBet(cart) {
  try {
    //https://test-express-5gi8.onrender.com
    //http://localhost:3030/postbet
    console.log(cart);
    const res = await fetch("http://47.128.95.51:3030/postbet", {
      method: "POST",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const error = new Error("An error occured while fetching the events");
      console.error(`Request failed with status ${res.status}`);
      throw error;
    } else {
      const { response } = await res.json();
      return response;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function deleteBet(id) {
  try {
    //https://test-express-5gi8.onrender.com
    //http://localhost:3030/postbet
    console.log(id);
    const res = await fetch(`http://47.128.95.51:3030/delete/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const error = new Error("An error occured while deleting the events");
      console.error(`Request failed with status ${res.status}`);
      throw error;
    } else {
      const { message } = await res.json();
      return message;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
