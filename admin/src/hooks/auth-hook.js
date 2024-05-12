import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URI } from "../utils";

export const useSignUp = (toast, toggle) => {
  return useMutation({
    mutationFn: async (formData) => {
      toggle();
      const { data } = await axios.post(`${API_URI}/auth/register`, formData);

      return data;
    },
    onError: (error, data) => {
      toggle();
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toggle();
      console.log(data);
      toast.success(data?.message);
      localStorage.setItem(
        "otp_data",
        JSON.stringify({
          otpLevel: true,
          id: data.user._id,
        })
      );
      setTimeout(() => {
        window.location.replace("/otp-verification");
      }, 3000);
    },
  });
};

export const useSignin = (toast, toggle) => {
  return useMutation({
    mutationFn: async (formData) => {
      toggle();
      const { data } = await axios.post(`${API_URI}/auth/login`, formData);

      localStorage.setItem("user", JSON.stringify(data));

      return data;
    },
    onError: (error) => {
      toggle();
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toggle();
      toast.success(data?.message);

      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    },
  });
};

export const useResend = (toast, toggle) => {
  return useMutation({
    mutationFn: async (id) => {
      toggle();
      const { data } = await axios.post(`${API_URI}/users/resend-link/${id}`);

      return data;
    },
    onError: (error, data) => {
      toggle();
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toggle();
      toast.success(data?.message);

      localStorage.setItem(
        "otp_data",
        JSON.stringify({
          otpLevel: true,
          id: data.user._id,
        })
      );

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });
};

export const useVerification = (toast) => {
  return useMutation({
    mutationFn: async ({ id, otp }) => {
      const { data } = await axios.post(`${API_URI}/users/verify/${id}/${otp}`);
      return data;
    },
    onError: (error, data) => {
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);

      setTimeout(() => {
        localStorage.removeItem("otp_data");
        window.location.replace("/auth");
      }, 1000);
    },
  });
};
