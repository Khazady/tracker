'use client';

import { DatePicker } from '@/components/assets/data-picker';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { createTransaction, State } from '@/lib/actions/transactions';
import { AssetType } from '@/lib/schemes/asset.scheme';
import { PlusCircle } from 'lucide-react';
import { useFormState } from 'react-dom';

const initialState = {} as State;

export function TransactionForm({ asset }: { asset: AssetType }) {
  const nonFormValues = {
    symbol: asset.symbol,
    assetId: asset.id,
  };
  const createWithNonFormValues = createTransaction.bind(null, nonFormValues);
  const [state, dispatch] = useFormState(createWithNonFormValues, initialState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form action={dispatch}>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={asset.name}
                wrapperClassName="col-span-3"
                errors={state.errors?.name}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="units" className="text-right">
                Quantity
              </Label>
              <Input
                id="units"
                name="units"
                wrapperClassName="col-span-3"
                errors={state.errors?.units}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="buyInPrice" className="text-right">
                Purchase Price
              </Label>
              <Input
                id="buyInPrice"
                name="buyInPrice"
                wrapperClassName="col-span-3"
                defaultValue={asset.price}
                errors={state.errors?.buyInPrice}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="buyInPrice" className="text-right">
                Transaction Date
              </Label>
              <DatePicker
                wrapperClassName="col-span-3"
                errors={state.errors?.opened}
                id="opened"
                name="opened"
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Transaction</Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
