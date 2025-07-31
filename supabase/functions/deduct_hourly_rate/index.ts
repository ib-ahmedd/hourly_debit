// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.0";

const supUrl = Deno.env.get("_SUPABASE_URL") as string;
const supKey = Deno.env.get("_SUPABASE_SERVICE_KEY") as string;

const supabase = createClient(supUrl, supKey);

Deno.serve(async () => {
  const { data: customers, error } = await supabase.rpc(
    "get_records_below_balance",
  );
  let updatedRecords = 0;
  for (let i = 0; i <= customers.length; i++) {
    const { id, balance, hourly_debit_amount } = customers[i];
    const newBalance = balance - hourly_debit_amount;
    const { error } = await supabase.from("customers").update({
      balance: newBalance,
      last_debited_at: new Date().toISOString(),
    })
      .eq("id", id);
    if (error) {
      const { error: debit_log_error } = await supabase.from("debit_logs")
        .insert([{
          customer_id: id,
          status: "failed",
          amount: hourly_debit_amount,
        }]);
      if (debit_log_error) {
        return new Response(
          JSON.stringify({
            message: "error updating records",
            error: debit_log_error,
          }),
          { headers: { "Content-Type": "application/json" } },
        );
      }
      return new Response(
        JSON.stringify({
          message: "error deducting hourly rate",
          error: error,
        }),
        { headers: { "Content-Type": "application/json" } },
      );
    } else {
      const { error: debit_log_error } = await supabase.from("debit_logs")
        .insert([{
          customer_id: id,
          status: "success",
          amount: hourly_debit_amount,
        }]);
      if (debit_log_error) {
        return new Response(
          JSON.stringify({
            message: "error updating records",
            error: debit_log_error,
          }),
          { headers: { "Content-Type": "application/json" } },
        );
      }
    }
    updatedRecords++;
    if (updatedRecords === customers.length) {
      return new Response(
        JSON.stringify({ message: "Balance records updated successfully" }),
        { headers: { "Content-Type": "application/json" } },
      );
    }
  }
  return new Response(
    JSON.stringify({ message: "Error fetching data", error: error.message }),
    { headers: { "Content-Type": "application/json" } },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/deduct_hourly_rate' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
