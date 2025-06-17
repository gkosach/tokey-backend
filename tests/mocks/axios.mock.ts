import axios, { AxiosError } from "axios";

/**
 * Мок для axios
 */
export const createAxiosMock = () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  // 🔧 ИСПРАВЛЕНО: создаем настоящие Error объекты, наследующие от Error
  const createAxiosErrorMock = (status: number, message: string) => {
    const error = new AxiosError(
      `Request failed with status code ${status}`,
      "ERR_BAD_REQUEST",
      {} as any,
      {} as any,
      {
        status,
        statusText: status === 400 ? "Bad Request" : "Error",
        data: { message },
        headers: {},
        config: {} as any,
      } as any,
    );

    return error;
  };

  const apiErrors = {
    persona400: createAxiosErrorMock(400, "Invalid template"),
    persona401: createAxiosErrorMock(401, "Invalid API key"),
    networkError: (() => {
      const error = new Error("Network Error") as AxiosError;
      error.isAxiosError = true;
      error.code = "ECONNREFUSED";
      error.name = "AxiosError";
      return error;
    })(),
  };

  return { mockedAxios, apiErrors };
};
