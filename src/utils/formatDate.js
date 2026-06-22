export function formatDisplayDate(dateValue) {
  if (!dateValue) return "";

  const date =
    typeof dateValue === "string"
      ? new Date(`${dateValue}T00:00:00`)
      : new Date(dateValue);

  if (Number.isNaN(date.getTime())) return dateValue;

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
