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
  wrapperClassName,
}: {
  id: string;
  name: string;
  disabled: DayPickerBase['disabled'];
  errors?: InputProps['errors'];
  wrapperClassName?: string;
}) {
  const [date, setDate] = React.useState<Date>();
  const [calendarOpen, setCalendarOpen] = React.useState(false);

  return (
    <div className={wrapperClassName}>
      <Input
        className="hidden"
        type="date"
        name={name}
        id={id}
        hidden
        value={date?.toLocaleDateString('en-CA')}
        errors={errors}
      />
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
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
            onSelect={(value) => {
              setDate(value);
              setCalendarOpen(false);
            }}
            initialFocus
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
      <Errors errors={errors} id={id} />
    </div>
  );
}
