// Strings the checked project writes (target names, versions, Info.plist and build setting values)
// reach the report as they are. A project file may be tens of megabytes, so one of them can be too:
// a 20 MB target name made every report format tens of megabytes long.

/** The most characters of a project string a report shows; real names and values are far shorter. */
export const PROJECT_TEXT_LIMIT = 200;

const ELLIPSIS = '…';

/** `text` cut to PROJECT_TEXT_LIMIT characters, ending in an ellipsis when it was longer. */
export function clip(text: string): string {
  if (text.length <= PROJECT_TEXT_LIMIT) return text;
  let end = PROJECT_TEXT_LIMIT - ELLIPSIS.length;
  // Never keep the first half of a surrogate pair without the second.
  const code = text.charCodeAt(end - 1);
  if (code >= 0xd800 && code <= 0xdbff) end--;
  return `${text.slice(0, end)}${ELLIPSIS}`;
}

/** clip() for a value that may be missing. */
export const clipOrNull = (text: string | null): string | null =>
  text === null ? null : clip(text);
