import axios from "axios";

/**
 * // Мок для axios
 */
export const createAxiosMock = () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const apiErrors = {
    persona400: {
      message: "API Error",
      response: {
        status: 400,
        data: { error: "Invalid template" },
      },
      isAxiosError: true,
    },
    persona401: {
      message: "Unauthorized",
      response: {
        status: 401,
        data: { error: "Invalid API key" },
      },
      isAxiosError: true,
    },
    networkError: {
      message: "Network Error",
      code: "ECONNREFUSED",
      isAxiosError: true,
    },
  };

  return { mockedAxios, apiErrors };
};
