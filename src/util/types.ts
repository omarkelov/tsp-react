export interface Abortable {
    abort: ((reason?: string) => void);
}
