# Hourly Debit Service App

A supabase restAPI that schedules hourly deduction from pre registered customers balances

## Setup Instructions

npm install to install dependencies

### Approach

* Email and password authentication handled by supabase authentication.
* Created database scheme in supabase with two tables(customers, debit_logs) with row level secuirity giving access to only authenticated users.
  * Customers table keeps track of customers created by authenticated users, their balance and logs their last debit time.
  * Debit_logs keeps track of the success or failure of hourly debits.
* Defined and deployed edge functions locally using supabase cli, Edge functions deployed include:
   * Create-client: Adds customers created by authenticated users to database.
   * Get-customers: Fetches all customers created by an authenticated user.
   * View-customer-details: Fetches a customer's debit history.
   * Deduct-hourly-rate: Deducts set hourly rates from customers' balances, logs the transactions into the debit_logs table and updates customers' balances.
* Scheduled a Cron job that involkes the deduct-hourly-rate edge function every hour.
* Built a react frontend for signup, login, retrieving customers info, registration of new customers, and viewing of customers' debit logs.
