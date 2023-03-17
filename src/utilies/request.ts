import axios, { AxiosError, ResponseType, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "https://103.120.133.234:50000/b1s/v1",
});

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.data) {
            if (response.status === 200 || response.status === 201) {
                return Promise.resolve(response.data)
            }
        }

        return Promise.reject(response);
    },
    (error) => {
        return Promise.reject(error);
    }
);



const request = async (method: string, url: string, data?: any, responseType?: ResponseType, headers?: any) => {
    let source = axios.CancelToken.source();

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                axiosInstance({
                    method,
                    url,
                    data,
                    headers: {
                        "B1S-ReplaceCollectionsOnPatch":
                            method.toLowerCase() === "patch" ? true : false,
                        ...headers,
                    },
                    // cancelToken : source,
                    responseType: responseType ?? "json"
                    // timeout: 20000,
                })
                    .then((response) => {
                        resolve({ data: response, headers: response.headers } );
                    })
                    .catch((e) => {
                        if (!(e instanceof AxiosError)) {

                            if (window.location.pathname !== "/login")
                                window.location.href = '/login';
                            else
                                reject(new Error('Internal Server Error'));

                            return;
                        }


                        if (e?.code === AxiosError.ERR_NETWORK) {
                            reject(new Error("Please check your connect"));
                        }

                        if (
                            e?.response?.status === 401 &&
                            window.location.pathname !== "/login"
                        ) {
                            window.location.href = "/login";
                            return;
                        }

                        let error = e?.response?.data?.error?.message?.value;
                        reject(new Error(error ?? 'Invalid request'));
                    });
            } catch (e) {
                window.location.href = '/login';
            }
        }, 1000);
    });
};

export default request;
