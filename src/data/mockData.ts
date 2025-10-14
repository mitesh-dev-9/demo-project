import { Invoice, User, WalletConfig } from '../types';

export const mockInvoices: Invoice[] = [
  { id: 'INV-01', amount: 1250, issueDate: '14/09/2025', dueDate: '14/09/2025', status: 'unpaid', vendor: 'TechSupply Co.' },
  { id: 'INV-02', amount: 890, issueDate: '22/09/2025', dueDate: '22/10/2025', status: 'paid', vendor: 'Office Supplies Inc' },
  { id: 'INV-03', amount: 12500, issueDate: '01/09/2025', dueDate: '01/10/2025', status: 'unpaid', vendor: 'Enterprise Solutions' },
  { id: 'INV-04', amount: 2340, issueDate: '10/09/2025', dueDate: '10/11/2025', status: 'unpaid', vendor: 'Marketing Partners' },
  { id: 'INV-05', amount: 4200, issueDate: '05/09/2025', dueDate: '05/10/2025', status: 'paid', vendor: 'Cloud Services Pro' },
  { id: 'INV-06', amount: 780, issueDate: '18/09/2025', dueDate: '18/10/2025', status: 'unpaid', vendor: 'Maintenance Corp' },
  { id: 'INV-07', amount: 9850, issueDate: '12/09/2025', dueDate: '12/10/2025', status: 'unpaid', vendor: 'Software Licensing Inc' },
  { id: 'INV-08', amount: 1560, issueDate: '25/09/2025', dueDate: '25/10/2025', status: 'paid', vendor: 'Consulting Group' },
  { id: 'INV-09', amount: 6700, issueDate: '08/09/2025', dueDate: '08/10/2025', status: 'unpaid', vendor: 'Hardware Depot' },
  { id: 'INV-010', amount: 3420, issueDate: '14/09/2025', dueDate: '14/11/2025', status: 'unpaid', vendor: 'Design Studios' },
  { id: 'INV-011', amount: 15000, issueDate: '02/09/2025', dueDate: '02/10/2025', status: 'unpaid', vendor: 'Premium Services LLC' },
  { id: 'INV-012', amount: 920, issueDate: '28/09/2025', dueDate: '28/10/2025', status: 'unpaid', vendor: 'Utilities Management' },
  { id: 'INV-013', amount: 8350, issueDate: '17/09/2025', dueDate: '17/10/2025', status: 'paid', vendor: 'Legal Advisors' },
  { id: 'INV-014', amount: 4890, issueDate: '11/09/2025', dueDate: '11/10/2025', status: 'unpaid', vendor: 'Logistics Partners' },
  { id: 'INV-015', amount: 2100, issueDate: '24/09/2025', dueDate: '24/10/2025', status: 'unpaid', vendor: 'Training Academy' },
  { id: 'INV-016', amount: 11200, issueDate: '06/09/2025', dueDate: '06/10/2025', status: 'unpaid', vendor: 'Data Analytics Inc' },
  { id: 'INV-017', amount: 1675, issueDate: '19/09/2025', dueDate: '19/11/2025', status: 'unpaid', vendor: 'Security Systems' },
  { id: 'INV-018', amount: 7250, issueDate: '13/09/2025', dueDate: '13/10/2025', status: 'paid', vendor: 'Web Hosting Plus' },
  { id: 'INV-019', amount: 3890, issueDate: '23/09/2025', dueDate: '23/10/2025', status: 'unpaid', vendor: 'Advertising Network' },
  { id: 'INV-020', amount: 5420, issueDate: '09/09/2025', dueDate: '09/10/2025', status: 'unpaid', vendor: 'Equipment Rental Co' },
  { id: 'INV-021', amount: 16800, issueDate: '03/09/2025', dueDate: '03/10/2025', status: 'unpaid', vendor: 'Construction Services' },
  { id: 'INV-022', amount: 2890, issueDate: '26/09/2025', dueDate: '26/10/2025', status: 'unpaid', vendor: 'Insurance Providers' },
  { id: 'INV-023', amount: 6120, issueDate: '16/09/2025', dueDate: '16/10/2025', status: 'paid', vendor: 'Telecommunications Ltd' },
  { id: 'INV-024', amount: 990, issueDate: '21/09/2025', dueDate: '21/11/2025', status: 'unpaid', vendor: 'Cleaning Services' },
  { id: 'INV-025', amount: 13450, issueDate: '07/09/2025', dueDate: '07/10/2025', status: 'unpaid', vendor: 'Engineering Solutions' },
];

export const mockUser: User = {
  name: 'John Doe',
  company: 'Tech Corp',
  address: '123 Main St, City, State 12345',
  phone: '+1 (555) 123-4567',
  note: 'Sample account notes',
};

export const mockWalletConfig: WalletConfig = {
  wallets: ['Wallet 1', 'Wallet 2', 'Wallet 3', 'Wallet 4'],
  networks: ['Network Type 1', 'Network Type 2', 'Network Type 3', 'Network Type 4'],
  stableCoins: ['USDC', 'USDT', 'DAI', 'BUSD'],
};
