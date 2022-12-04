export class AuthService {
  static isAuthenticated() {
    return AuthService.getToken() != null;
  }

  static saveToken(token) {
    if(token.remember){
      localStorage.setItem("token", JSON.stringify(token));
    }else{
      sessionStorage.setItem("token", JSON.stringify(token));
    }
  }

  static saveCurrentUserData(data) {
    localStorage.setItem("current-user", JSON.stringify(data));
  }

  static getCurrentUserData() {
    return JSON.parse(localStorage.getItem("current-user"));
  }

  static getToken(tokenType = "token") {
    try {
      let [token] =
        document.cookie != null && document.cookie.indexOf(";") !== -1
          ? document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              .split("=")
          : [];

      if (!token || !token.trim().length) {
        // Read from sessionStorage
        const storedToken = localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token");
        const tokenPayload = storedToken ? JSON.parse(storedToken) : null;

        if (tokenPayload != null) {
          token = tokenPayload[tokenType];
        }
      }

      return token;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export const authService = new AuthService()