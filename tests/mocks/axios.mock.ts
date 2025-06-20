import axios from "axios";

export const createAxiosMock = () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  (mockedAxios.isAxiosError as any) = jest.fn((error: any) => {
    return error && error.isAxiosError === true;
  });

  const createAxiosErrorMock = (status: number, message: string) => {
    return {
      isAxiosError: true,
      message: `Request failed with status code ${status}`,
      name: "AxiosError",
      code: "ERR_BAD_REQUEST",
      response: {
        status,
        statusText: status === 400 ? "Bad Request" : "Error",
        data: { message },
        headers: {},
        config: {},
      },
      config: {},
      request: {},
    };
  };

  const apiErrors = {
    persona400: createAxiosErrorMock(400, "Invalid template"),
    persona401: createAxiosErrorMock(401, "Invalid API key"),
    networkError: new Error("Network timeout"),
  };

  return { mockedAxios, apiErrors };
};
