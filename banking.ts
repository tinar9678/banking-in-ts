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
        this.transactions = [];
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
    private accounts: Map<number, BankAccount>;

    constructor() {
        this.accounts = new Map<number, BankAccount>();
    }

    executeTransaction(accountFrom: number, accountTo: number, amount: number) : Promise<boolean> {
        return new Promise((resolve, reject) => {
                this.validateAccount(accountFrom, amount)
                    .then(() => {
                            this.accounts.get(accountFrom)?.withdraw(amount);
                            this.accounts.get(accountTo)?.deposit(amount);
                            console.log("transaction completed.");
                            resolve(true);
                    }).catch(
                        () => 
                       { console.log("transaction invalid.");
                        reject(false);
                    })
        });
    }

    validateAccount(accountNumber: number, amount: number) : Promise<void> {
        return new Promise((resolve, reject) => {
            const account =  this.accounts.get(accountNumber);
            if (account && account.getBalance() > amount) {
                resolve();
            } else {
                reject();
            }
        });
    }

    addAccount(holder: string) {
        const accountId = Math.random();
        this.accounts.set(accountId, new BankAccount(accountId, holder));
    }

    rankAccountsBasedOnTransactions(n: number) : BankAccount[] {
        const sortedValues = Array.from(this.accounts.values()).sort((a, b) =>  b.getTransactions().length - a.getTransactions().length);
        return sortedValues.slice(0, n);
    }

    getAccountViaAccountHolder(accountHolder: string) : BankAccount {
        const account = Array.from(this.accounts.values()).find((account) => account.getAccountHolder() === accountHolder);
        if (!account) {
            throw new Error(`Account with holder '${accountHolder}' not found.`);
        }
        return account;
    }

    getAccountViaAccountNumber(accountNumber: number) : BankAccount {
        const account = this.accounts.get(accountNumber);
        if (!account) {
            throw new Error(`Account with number '${accountNumber}' not found.`);
        }
        return account;
    }
}

// Create a bank
const myBank = new Bank();

// Add accounts to the bank
myBank.addAccount("John Doe");
myBank.addAccount("Jane Doe");

// Get account numbers
const account1Number = Array.from(myBank['accounts'].keys())[0];
const account2Number = Array.from(myBank['accounts'].keys())[1];

// Add money to accounts
myBank.getAccountViaAccountNumber(account1Number).deposit(1000);

// Perform transactions
myBank.executeTransaction(account1Number, account2Number, 500).then((result) => console.log("success")).catch(() => console.log("fail")); // Valid transaction
myBank.executeTransaction(account1Number, account2Number, 1000).then(() => console.log("success")).catch(() => console.log("fail"));; // Invalid transaction due to insufficient balance

// Get account details and transactions
const account1 = myBank.getAccountViaAccountHolder("John Doe");
console.log(`Account Holder: ${account1.getAccountHolder()}, Account Number: ${account1.getAccountNumber()}, Balance: ${account1.getBalance()}`);
console.log("Transactions:", account1.getTransactions());

// Rank accounts based on transactions
const topAccounts = myBank.rankAccountsBasedOnTransactions(1);
console.log("Top Account Holder:", topAccounts[0].getAccountHolder(), "Number of Transactions:", topAccounts[0].getTransactions().length);
