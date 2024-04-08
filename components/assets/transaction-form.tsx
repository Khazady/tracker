'use client';

import { DatePickerDemo } from '@/components/assets/data-picker';
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
import { createPosition } from '@/lib/actions/position';
import { AssetType } from '@/lib/schemes/asset.scheme';
import { PlusCircle } from 'lucide-react';

export function TransactionForm({ asset }: { asset: AssetType }) {
  const createWithNonFormValues = createPosition.bind(null, {
    symbol: asset.symbol,
    assetId: asset.id,
    message: '',
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={createWithNonFormValues}>
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
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="units" className="text-right">
                Quantity
              </Label>
              <Input id="units" name="units" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="buyInPrice" className="text-right">
                Purchase Price
              </Label>
              <Input
                id="buyInPrice"
                name="buyInPrice"
                className="col-span-3"
                defaultValue={asset.price}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="buyInPrice" className="text-right">
                Transaction Date
              </Label>
              <DatePickerDemo
                //defaultValue={current Date}
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
