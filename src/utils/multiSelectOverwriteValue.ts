export function multiSelectOverwriteValue(
  value: any,
  selectedValues: string[] | number[],
  setSelectedValues: any
) {
  // 9 represent the id of value All on Areas
  // All represent the value All on Countries
  if (value.includes(9)) {
    if (value[0] !== 9 || selectedValues?.length === 0) {
      setSelectedValues?.([9]);
    } else {
      const filteredArray = value.filter((e: number) => e !== 9);
      setSelectedValues?.(filteredArray);
    }
  } else if (value.includes("All")) {
    if (value[0] !== "All" || selectedValues?.length === 0) {
      setSelectedValues?.(["All"]);
    } else {
      const filteredArray = value.filter((e: string) => e !== "All");
      setSelectedValues?.(filteredArray);
    }
  } else {
    setSelectedValues?.(value);
  }
}
