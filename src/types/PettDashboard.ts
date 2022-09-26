declare namespace PettDashboard {
    type Balance = {
        address: string;
        reference: string;
        available: number;
        frozen: number;
        coin: {
            withdrawals_enabled: boolean;
            deposits_enabled: boolean;
            min_withdrawal: number;
            confirmations: number;
            min_deposit: number;
            reference: string;
            network: string;
            ticker: string;
            name: string;
            logo: string;
        };
    };

    type History = {
        amount: number;
        created: number;
        updated: number;
        timelock: number;
        category: string;
        status: string;
        txid: string;
        coin: {
            reference: string;
            network: string;
            ticker: string;
            name: string;
            logo: string;
        };
    };

    type User = {
        phone_number: number;
        telegram_activated: boolean;
        email: number;
        email_activated: boolean;
        last_active: number;
        created: number;
        login: number;
        reference: string;
        banned: boolean;
        admin: boolean;
    };

    type Withdrawal = {
        reference: string;
        amount: number;
        comment: string;
        created: number;
        admin: string;
        user: string;
        refunded: boolean;
        address: string;
        sent: boolean;
        txid: string;
        refund_time: number;
        sent_time: number;
        coin: {
            min_withdrawal: number;
            confirmations: number;
            min_deposit: number;
            reference: string;
            network: string;
            ticker: string;
            name: string;
            logo: string;
        };
    };
}
