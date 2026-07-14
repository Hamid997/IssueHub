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

export interface CurrentUser {
  id: string;
  username: string;
  email: string;
}

export interface ChangePasswordData {
    current_password: string;
    new_password: string;
    confirm_password: string;
}

const TOKEN_KEY = "token";
const USER_KEY = "user";


const authService = {
  async login(data: LoginData): Promise<TokenResponse> {
    const response = await api.post("/users/login", data);
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post("/users/register", data);
    return response.data;
  },

  async getCurrentUser(): Promise<CurrentUser> {
    const response = await api.get("/users/me");
    return response.data;
  },

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveUser(user: CurrentUser) {
    localStorage.setItem(
      USER_KEY,
      JSON.stringify(user)
    );
  },

  getUser(): CurrentUser | null {
    const value = localStorage.getItem(USER_KEY);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as CurrentUser;
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  },

  async changePassword(data: ChangePasswordData) {
    const response = await api.patch("/users/change-password", data);

    return response.data;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

export default authService;