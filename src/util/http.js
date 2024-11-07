import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function getBets(name) {
  try {
    //https://test-express-5gi8.onrender.com/${name}
    //http://localhost:3030/${name}
    //http://47.128.95.51:3030/${name}
    //https://huatah-backend.vercel.app
    //backend-service.default.svc.cluster.local
    //http://146.190.109.253:30000
    const url = `https://huatah.co/api/${name}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`https://huatah.co/balance/${profile}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        `Request failed with status ${response.status}`,
        errorData.message
      );

      if (response.status === 401) {
        // Handle token expiration
        // Remove the token from localStorage
        // localStorage.removeItem("token");
        // localStorage.removeItem("isLoggedIn");
        // localStorage.removeItem("profile");
        // Optionally, you can dispatch a logout action if using Redux
        // dispatch(logoutAction());

        // Redirect to the login page
        // Adjust the path as needed
        return null;
      }

      // Handle other non-OK responses
      return {};
    }

    const { data } = await response.json();
    const balance = data ? data[0].balance : "0.00";
    return balance;
  } catch (error) {
    return { message: "error", data: [] };
  }
}

export async function getSummary(profile) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`https://huatah.co/summary/${profile}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        `Request failed with status ${response.status}`,
        errorData.message
      );

      if (response.status === 401) {
        // Handle token expiration
        // Remove the token from localStorage
        // localStorage.removeItem("token");
        // localStorage.removeItem("isLoggedIn");
        // localStorage.removeItem("profile");
        // Optionally, you can dispatch a logout action if using Redux
        // dispatch(logoutAction());

        // Redirect to the login page
        // Adjust the path as needed
        return { message: "token expired", data: [] };
      }

      // Handle other non-OK responses
      return {};
    }
    const resData = await response.json();
    return resData;
  } catch (error) {
    return { message: "error", data: [] };
  }
}

export async function getActive(profile) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`https://huatah.co/active/${profile}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        `Request failed with status ${response.status}`,
        errorData.message
      );

      if (response.status === 401) {
        // Handle token expiration
        // Remove the token from localStorage
        // localStorage.removeItem("token");
        // localStorage.removeItem("isLoggedIn");
        // localStorage.removeItem("profile");
        // Optionally, you can dispatch a logout action if using Redux
        // dispatch(logoutAction());

        // Redirect to the login page
        // Adjust the path as needed
        return { message: "token expired", data: [] };
      }

      // Handle other non-OK responses
      return {};
    }
    const resData = await response.json();
    return resData;
  } catch (error) {
    return { message: "error", data: [] };
  }
}

export async function postBet(cart) {
  const token = localStorage.getItem("token");
  try {
    console.log(cart);
    const res = await fetch("https://huatah.co/postbet", {
      method: "POST",
      body: JSON.stringify(cart),
      headers: {
        Authorization: `Bearer ${token}`,
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
    console.log(id);
    const res = await fetch(`https://huatah.co/delete/${id}`, {
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

export async function login(input, password) {
  try {
    const res = await fetch("https://huatah.co/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: input,
        password,
      }),
    });
    const response = await res.json();

    return response;
  } catch (error) {
    console.error("error");
  }
}

// export async function testtoken() {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await fetch("http://huatah.co/testtoken", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const response = await res.json();
//     if (response.message === "testtoken is successful") {
//       return true;
//     } else return false;
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function register(username, password) {
  try {
    const res = await fetch("https://huatah.co/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const response = await res.json();
    if (!res.ok) {
      return { message: "fail" };
    }

    return { message: "successful" };
  } catch (error) {
    console.log("we will do this later");
  }
}

export async function changePassword(username, password) {
  try {
    const res = await fetch("https://huatah.co/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const response = await res.json();
    if (!res.ok) {
      if (response.message === "Username not found")
        return { message: response.message };
      return { message: "fail" };
    }

    return { message: "successful" };
  } catch (error) {
    console.log("we will do this later");
  }
}
