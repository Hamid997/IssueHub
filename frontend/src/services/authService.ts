import api from "../api/api";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
}

const TOKEN_KEY = "token";

const authService = {
  async login(data: LoginData): Promise<TokenResponse> {
    const response = await api.post("/users/login", data);
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post("/users/register", data);
    return response.data;
  },

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  logout() {
    localStorage.removeItem("token");
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

export default authService;