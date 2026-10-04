const FILTER_LABEL_ALL = "All";

const alphabeticalCollator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

function getUniqueOptions(values) {
  return [
    ...new Set(
      values
        .filter((value) => typeof value === "string")
        .map((value) => value.trim())
        .filter(Boolean)
    ),
  ];
}

export function createAlphabeticalFilterTabs(values) {
  const options = getUniqueOptions(values).sort((a, b) =>
    alphabeticalCollator.compare(a, b)
  );

  return [FILTER_LABEL_ALL, ...options];
}

export function createNewestFirstFilterTabs(values) {
  const options = getUniqueOptions(values).sort((a, b) =>
    alphabeticalCollator.compare(b, a)
  );

  return [FILTER_LABEL_ALL, ...options];
}
