import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { useStore } from "../../store/useStore";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";

const transactionSchema = z.object({
  description: z.string().min(2, "Info Required"),
  amount: z.coerce.number().min(1, "You can't add zero."),
  type: z.enum(["Income", "Expense"]),
  category: z.enum(["Income", "Technology", "Food", "Housing", "Transport", "Entertainment"]),
  date: z.string(),
});

type TransactionFormInput = z.input<typeof transactionSchema>;
type TransactionFormOutput = z.output<typeof transactionSchema>;

export const AddTransactionModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const addTransaction = useStore((state) => state.addTransaction);

  const form = useForm<TransactionFormInput, any, TransactionFormOutput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: "",
      amount: 0,
      type: "Expense",
      category: "Technology",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data: TransactionFormOutput) => {
    addTransaction({
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      status: "Completed",
    });
    onOpenChange(false);
    form.reset();
  };

  const currentAmount = form.watch("amount");
  const numericAmount = Number(currentAmount) || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106 rounded-3xl ring-0 ring-foreground/10 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-tight">Add Transaction</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black/60 text-xs font-bold uppercase tracking-wider">Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. AWS Credits" {...field} className="shadow rounded-xl bg-[#f1f3ff] border-none focus-visible:ring-primary/30" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black/60 text-xs font-bold uppercase tracking-wider">Amount (USD)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value as number}
                        className="shadow rounded-xl bg-[#f1f3ff] border-none focus-visible:ring-primary/30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-black/60 text-xs font-bold tracking-wider ">Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl border-none shadow">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl bg-[#f1f3ff] border-none focus-visible:ring-primary/30">
                        <SelectItem className="font-bold hover:bg-white" value="Income">Income</SelectItem>
                        <SelectItem className="font-bold hover:bg-white" value="Expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black/60 text-xs font-bold uppercase tracking-wider">Category</FormLabel>

                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl border-none shadow">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl bg-[#f1f3ff] border-none focus-visible:ring-primary/30 font-bold">
                      <SelectItem className="hover:bg-white" value="Income">Income</SelectItem>
                      <SelectItem className="hover:bg-white" value="Technology">Technology</SelectItem>
                      <SelectItem className="hover:bg-white" value="Food">Food</SelectItem>
                      <SelectItem className="hover:bg-white" value="Housing">Housing</SelectItem>
                      <SelectItem className="hover:bg-white" value="Transport">Transport</SelectItem>
                      <SelectItem className="hover:bg-white" value="Entertainment">Entertainment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-black/60 text-xs font-bold uppercase tracking-wider">Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="shadow rounded-2xl bg-[#f1f3ff] border-none focus-visible:ring-primary/30" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-2xl font-bold hover:opacity-80 transition-all active:scale-95"
            >
              Confirm Transaction
            </button>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};