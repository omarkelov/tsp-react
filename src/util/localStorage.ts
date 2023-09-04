const LOCAL_STORAGE_EVENT = new Event('local-storage');

export const persistInLocalStorage = <T>(key: string, value: T) => {
    const valueStr = JSON.stringify(value);

    if (valueStr === localStorage.getItem(key)) {
        return;
    }

    localStorage.setItem(key, valueStr);
    window.dispatchEvent(LOCAL_STORAGE_EVENT);
};
