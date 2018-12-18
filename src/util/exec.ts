

export function execCommand(name: string, value?: any) {
    document.execCommand(name, false, value);
}