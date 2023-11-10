enum TRANSACTION_TYPE {
    deposit,
    withdrawal
}

class Transaction {
    private amount: number;
    private type: TRANSACTION_TYPE;
    private date: number;

    constructor(amount: number, type: TRANSACTION_TYPE) {
        this.amount = amount;
        this.type = type;
        this.date = Date.now();
    }
}

class BankAccount {
    private accountNumber: number;
    private accountHolder: string;
    private balance: number;
    private transactions: Transaction[];

    constructor(accountNumber: number, accountHolder: string) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = 0;
    }

    withdraw(amount: number) : void {
        this.balance-=amount;
        this.transactions.push(new Transaction(amount, TRANSACTION_TYPE.withdrawal))
    }

    deposit(amount: number) : void {
        this.balance+=amount;
        this.transactions.push(new Transaction(amount, TRANSACTION_TYPE.deposit))
    }

    getBalance() : number {
        return this.balance;
    }

    getAccountNumber() : number {
        return this.accountNumber;
    }

    getAccountHolder() : string {
        return this.accountHolder;
    }

    getTransactions() : Transaction[] {
        return this.transactions;
    }
}

class Bank {
    private accounts: BankAccount[];

    constructor() {
        this.accounts = [];
    }

    addAccount(holder: string) {
        this.accounts.push(new BankAccount(Math.random(), holder));
    }

    rankAccountsBasedOnTransactions(n: number) : BankAccount[] {
        this.accounts.sort((a, b) => a.getTransactions().length - b.getTransactions().length);
        return this.accounts.slice(n);
    }
}