import { spanishify } from "@/lib/utils";
import { TextInput } from "@mantine/core";
import React from "react";

export function SpanishInput({ onChange, className }: { onChange: (value: string) => void, className?: string }) {
  const [value, setValue] = React.useState<string>("");
  return <TextInput value={value} className={className} onChange={(e) => {
    const result = spanishify(e.target.value);
    setValue(result);
    onChange(result);
}} />;
}
