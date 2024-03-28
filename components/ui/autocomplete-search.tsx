import Avatar from '@/components/ui/avatar/avatar';
import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { ChevronRight } from 'lucide-react';
import { type KeyboardEvent, useRef, useState } from 'react';

export type Option = Record<'value' | 'label' | 'icon', string> &
  Record<string, string>;

type AutoCompleteProps = {
  options: Option[];
  emptyMessage: string;
  onValueSelect: (assetId: string) => void;
  onAllSelect: (query: string) => void;
  onInputChange: (value: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

export const AutocompleteSearch = ({
  options,
  placeholder,
  emptyMessage,
  onValueSelect,
  onInputChange,
  onAllSelect,
  disabled,
  isLoading = false,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setOpen] = useState(false);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (!input) {
      return;
    }
    // Keep the options displayed when the user is typing
    if (!isOpen) {
      setOpen(true);
    }

    if (event.key === 'Escape') {
      input.blur();
    }
  };

  const handleInputChange = (search: string) => {
    setInputValue(search);
    onInputChange(search);
    if (isLoading) return;
    setOpen(true);
  };

  const handleBlur = () => {
    setOpen(false);
  };

  const handleSelectOption = (selectedId: string) => {
    onValueSelect(selectedId);
    handleBlur();
  };

  const handleSelectAll = () => {
    if (inputValue) {
      onAllSelect(inputValue);
    }
  };

  return (
    <CommandPrimitive shouldFilter={false} onKeyDown={handleKeyDown}>
      <CommandInput
        isLoading={isLoading}
        ref={inputRef}
        value={inputValue}
        onValueChange={handleInputChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className="w-[300px] text-base"
      />
      <div className="relative mt-1">
        {isOpen && (
          <div className="absolute top-0 z-10 w-full rounded-xl bg-stone-50 outline-none animate-in fade-in-0 zoom-in-95">
            <CommandList className="rounded-lg ring-1 ring-slate-200">
              {options.length > 0 && !isLoading && (
                <>
                  <CommandItem
                    className="flex cursor-pointer justify-between"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                    onSelect={handleSelectAll}
                    forceMount
                  >
                    <span>Show all results</span>
                    <ChevronRight />
                  </CommandItem>

                  <CommandSeparator />

                  <CommandGroup heading="Crypto">
                    {options.map((option) => {
                      return (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                          onSelect={() => handleSelectOption(option.value)}
                          className="flex w-full cursor-pointer items-center gap-2"
                        >
                          <Avatar url={option.icon} name={option.label} />
                          <span>{option.label}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </>
              )}
              {!options.length && !isLoading && (
                <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                  {emptyMessage}
                </CommandPrimitive.Empty>
              )}
            </CommandList>
          </div>
        )}
      </div>
    </CommandPrimitive>
  );
};
