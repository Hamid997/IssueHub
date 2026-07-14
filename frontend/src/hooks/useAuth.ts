import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuthContext from "./useAuthContext";
import authService from "../services/authService";
import { getErrorMessage } from "../utils/errorHandler";
import type { ChangePasswordData } from "../services/authService";

export default function useAuth() {
  const auth = useAuthContext();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function login(
    email: string,
    password: string
  ) {
    try {
      setLoading(true);

      const response = await authService.login({
        email,
        password,
      });

      authService.saveToken(
        response.access_token
      );

      const user =
        await authService.getCurrentUser();

      authService.saveUser(user);

      auth.login(user);

      toast.success("Login successful");

      navigate("/");

    } catch (error) {

      toast.error(
        getErrorMessage(error)
      );

    } finally {

      setLoading(false);

    }
  }

  async function register(data: {
    username: string;
    email: string;
    password: string;
  }) {

    try {

      setLoading(true);

      await authService.register(data);

      const response =
        await authService.login({
          email: data.email,
          password: data.password,
        });

      authService.saveToken(
        response.access_token
      );

      const user =
        await authService.getCurrentUser();

      authService.saveUser(user);

      auth.login(user);

      toast.success(
        "Account created successfully"
      );

      navigate("/");

    } catch (error) {

      toast.error(
        getErrorMessage(error)
      );

    } finally {

      setLoading(false);

    }
  }

  async function changePassword(data: ChangePasswordData) {
    try {
      setLoading(true);
      const response = await authService.changePassword(data);
      toast.success(response.message);
    }
    catch (error) {
      toast.error(
        getErrorMessage(error),
      );
    }
    finally {
      setLoading(false);
    }
  }

  function logout() {
    auth.logout();
    navigate("/login");
  }

  return {
    loading,
    login,
    register,
    changePassword,
    logout,
    isAuthenticated: authService.isAuthenticated(),
  };
}