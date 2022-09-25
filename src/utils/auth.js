class Auth {
  constructor() {
    this.baseUrl = "https://register.nomoreparties.co";
  }

  signup(email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  }

  signin(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("email", email);
        return data;
      })
      .catch((err) => console.log(err));
  }

  checkToken(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        return data;
      });
  }
}

const auth = new Auth();

export default auth;
