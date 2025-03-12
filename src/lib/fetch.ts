export const appFetch = async <T>(
  url: string,
  init?: RequestInit
): Promise<T> => {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: Promise<T> = await response.json();
  return result as Promise<T>;
};
