declare namespace Dashboard {
    type Coin = {
        withdrawals_enabled: boolean;
        deposits_enabled: boolean;
        min_withdrawal: number;
        confirmations: number;
        min_deposit: number;
        reference: string;
        network: string;
        ticker: string;
        price: number;
        name: string;
        logo: string;
    };

    type Balance = {
        address: string;
        reference: string;
        available: number;
        frozen: number;
        usd: {
            available: number;
            frozen: number;
        };
        coin: Coin;
    };

    type User = {
        reference: string;
        phone_number: number;
        username: string;
        email: string;
        banned: boolean;
        admin: boolean;
        email_activated?: boolean;
        last_active?: number;
        created?: number;
        login?: number;
    };

    type History = {
        amount: number;
        created: number;
        updated: number;
        timelock: number;
        category: string;
        status: string;
        event: string;
        txid: string;
        user: User;
        coin: {
            reference: string;
            network: string;
            ticker: string;
            name: string;
            logo: string;
        };
    };

    type Withdrawal = {
        reference: string;
        amount: number;
        comment: string;
        created: number;
        admin: string;
        user: User;
        refunded: boolean;
        address: string;
        sent: boolean;
        txid: string;
        refund_time: number;
        sent_time: number;
        coin: Coin;
    };

    type Funding = Withdrawal & {
        funded_time: number;
        refunded_time: number;
        timelock: number;
    };
}
