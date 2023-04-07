import { configureStore } from "@reduxjs/toolkit";
import transactionslice from "../features/Transactions/transactionslice";

export const store = configureStore({
    reducer: {
        transactions:transactionslice,
    },
});
