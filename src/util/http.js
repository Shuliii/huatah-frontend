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
  const balance = data ? data[0].balance : "0.00";

  return balance;
}

export async function getSummary(profile) {
  const response = await fetch(
    `https://test-express-5gi8.onrender.com/summary/${profile}`
  );

  if (!response.ok) {
    const error = new Error("An error occured while fetching the events");
    console.error(`Request failed with status ${response.status}`);
    throw error;
  }

  const resData = await response.json();
  return resData;
}

export async function getActive(profile) {
  const response = await fetch(
    `https://test-express-5gi8.onrender.com/active/${profile}`
  );

  if (!response.ok) {
    const error = new Error("An error occured while fetching the events");
    console.error(`Request failed with status ${response.status}`);
    throw error;
  }
  const resData = await response.json();
  return resData;
}