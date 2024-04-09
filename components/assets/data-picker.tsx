'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Errors } from '@/components/ui/error-message';
import { Input, InputProps } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DayPickerBase } from 'react-day-picker';

export function DatePicker({
  id,
  name,
  disabled,
  errors,
}: {
  id: string;
  name: string;
  disabled: DayPickerBase['disabled'];
  errors?: InputProps['errors'];
}) {
  const [date, setDate] = React.useState<Date>();

  //todo: simplify with useImperativeHandle or smth like that
  return (
    <>
      <Input
        className="hidden"
        type="date"
        name={name}
        id={id}
        hidden
        value={date?.toLocaleDateString('en-CA')}
        errors={errors}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
      <Errors errors={errors} id={id} />
    </>
  );
}
