export const BASE_URL = "http://localhost:5002";

export const API_PATH = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/getUser",
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard/get-dashboard",
    },
    INCOME: {
        ADD_INCOME: "/api/v1/income/add-income",
        GET_ALL_INCOME: "/api/v1/income/get-incomes",
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add-expense",
        GET_ALL_EXPENSE: "/api/v1/expense/get-expenses",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/v1/auth/upload-image",
    },
};
