import api from "../api/api";

interface LoginData {
  email: string;
  password: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
}

const authService = {
  async login(data: LoginData): Promise<TokenResponse> {
    const response = await api.post("/users/login", data);
    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
  },

  saveToken(token: string) {
    localStorage.setItem("token", token);
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  },
};

export default authService;