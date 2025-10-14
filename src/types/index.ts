export interface Invoice {
  id: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'unpaid' | 'paid';
  vendor: string;
}

export interface User {
  name: string;
  company: string;
  address: string;
  phone: string;
  note: string;
}

export interface WalletConfig {
  wallets: string[];
  networks: string[];
  stableCoins: string[];
}
