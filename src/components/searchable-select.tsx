import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";

export interface Option {
  label: string;
  value: string;
}

interface SearchableSelectProps {
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchableSelect({
  options,
  placeholder = "Chọn mục...",
  value,
  onChange,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  // debounce query 400ms
  const debouncedQuery = useDebounce(query, 400);
  const selected = React.useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value]
  );

  // Chỉ filter bằng debouncedQuery
  const filtered = React.useMemo(() => {
    let list = options.filter((opt) =>
      opt.label.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    if (selected) {
      list = [selected, ...list.filter((opt) => opt.value !== selected.value)];
    }

    return list;
  }, [debouncedQuery, options, selected]);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-64 justify-between"
        >
          {selected ? selected.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </Popover.Trigger>

      {open && (
        <Popover.Portal forceMount>
          <Popover.Content
            align="start"
            sideOffset={6}
            className="w-64 p-2 rounded-lg border bg-popover shadow-lg"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 px-1">
                <Search className="size-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-8 text-sm bg-transparent"
                />
              </div>

              <div className="max-h-64 overflow-y-auto space-y-1">
                {filtered.length ? (
                  filtered.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        onChange?.(opt.value);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition",
                        opt.value === value && "text-accent-foreground"
                      )}
                    >
                      {opt.label}
                      {opt.value === value && (
                        <Check className="h-4 w-4 opacity-100" />
                      )}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-3">
                    Không tìm thấy kết quả
                  </p>
                )}
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      )}
    </Popover.Root>
  );
}
