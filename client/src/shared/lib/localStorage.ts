export const localStorageRead = <T>(key: string): T | null => {
  const storageValue = localStorage.getItem(key);

  if (storageValue === null) {
    return null;
  }

  return JSON.parse(storageValue) as T;
};

export const localStorageWrite = <T>(key: string, value: T): void => {
  const storageValue = JSON.stringify(value);

  if (value === null || value === undefined) {
    return;
  }

  localStorage.setItem(key, storageValue);
};

export const localStorageRemove = (key: string): void => {
  localStorage.removeItem(key);
};

export const localStorageClear = (): void => {
  localStorage.clear();
};
