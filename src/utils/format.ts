export const formatCurrency = (input: number | string | null | undefined) => {
  if (input === null || input === undefined) return null;

  // normalize input
  if (typeof input === "string") {
    const trimmed = input.trim();
    if (trimmed === "") return null;
    // allow numbers with commas (e.g. "1,234.56") so remove commas for parsing
    const cleaned = trimmed.replace(/,/g, "");
    // validate strictly: optional sign, digits, optional fraction
    if (!/^[-+]?\d+(?:\.\d+)?$/.test(cleaned)) return null;

    const fracPart = cleaned.split(".")[1] ?? "";
    const num = Number(cleaned);
    if (!Number.isFinite(num)) return null;

    // preserve fraction length from the original string
    const fracLen = fracPart.length;
    return fracLen > 0
      ? num.toLocaleString("en-US", {
          minimumFractionDigits: fracLen,
          maximumFractionDigits: fracLen,
        })
      : num.toLocaleString("en-US");
  }

  if (typeof input === "number") {
    if (!Number.isFinite(input)) return null;
    // Convert number to string to detect fraction length (if any)
    const s = String(input);
    const fracPart = s.split(".")[1] ?? "";
    const fracLen = fracPart.length;
    return fracLen > 0
      ? input.toLocaleString("en-US", {
          minimumFractionDigits: fracLen,
          maximumFractionDigits: fracLen,
        })
      : input.toLocaleString("en-US");
  }

  return null;
};

/**
 * Convert a number (or numeric string) to a compact short form using units.
 * Examples:
 * - 123 -> "123"
 * - 1234 -> "1.2k"
 * - 1000000 -> "1M"
 * - "1500000" -> "1.5M"
 * Returns null for invalid input.
 *
 * Name: formatCompactNumber (abbreviates numbers using k, M, B, T)
 */
export const formatCompactNumber = (
  input: number | string | null | undefined,
  precision = 1
): string | null => {
  if (input === null || input === undefined) return null;

  let num: number;
  if (typeof input === "string") {
    const trimmed = input.trim();
    if (trimmed === "") return null;
    const cleaned = trimmed.replace(/,/g, "");
    if (!/^[-+]?\d+(?:\.\d+)?$/.test(cleaned)) return null;
    num = Number(cleaned);
  } else if (typeof input === "number") {
    num = input;
  } else {
    return null;
  }

  if (!Number.isFinite(num)) return null;

  const sign = num < 0 ? "-" : "";
  const abs = Math.abs(num);

  const units: { value: number; symbol: string }[] = [
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" },
  ];

  for (const unit of units) {
    if (abs >= unit.value) {
      const v = abs / unit.value;
      // format with precision, but drop trailing .0
      let out = v.toFixed(precision).replace(/\.0+$/, "");
      // also trim unnecessary trailing zeros like 1.50 -> 1.5
      out = out.replace(/(\.[0-9]*?)0+$/, "$1").replace(/\.$/, "");
      return `${sign}${out}${unit.symbol}`;
    }
  }

  // for values less than 1000, return localized integer/fractional with commas
  return formatCurrency(num);
};

export function numbersToRange(input: number[] | readonly number[]): string {
  if (!input || input.length === 0) return "";

  // Normalize: filter invalid numbers, unique and sorted
  const nums = Array.from(new Set(input.filter((n) => Number.isFinite(n))))
    .map((n) => Math.trunc(n))
    .sort((a, b) => a - b);

  if (nums.length === 0) return "";

  const ranges: string[] = [];
  let start = nums[0];
  let prev = nums[0];

  for (let i = 1; i <= nums.length; i++) {
    const cur = nums[i];

    // if contiguous, extend the current range
    if (cur === prev + 1) {
      prev = cur;
      continue;
    }

    // close current range
    if (start === prev) {
      ranges.push(String(start));
    } else {
      ranges.push(`${start}-${prev}`);
    }

    // start new range if there are remaining numbers
    if (typeof cur === "number") {
      start = cur;
      prev = cur;
    }
  }

  return ranges.join(",");
}
