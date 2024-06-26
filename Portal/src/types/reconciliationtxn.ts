import { ReconciliationMismatchSTATES } from "shared-lib";

export interface reconciliationtxn {
    id: number;
    resolved: Date | null;
    status: string;
    transaction_amount: number;
    transaction_ref_number: string;
    transaction_timestamp: Date;
    mismatch_source: number;
    mismatch_reason: string;
}

export interface reconciliationTrxVariances {
    id: number;
    resolved: Date | null;
    status: string;
    transaction_ref_number: string;
    transaction_timestamp: Date;
    mismatch_source: number;
    mismatch_reason: string;
    transaction_amount: {
        switch: number | null,
        dfsp: number
    };
    transaction_status: {
        switch: string
        dfsp: string
    };
    resolve_reason: string
}
export interface resolveTrx {
    id: number
    reason: string
    status: ReconciliationMismatchSTATES
}

