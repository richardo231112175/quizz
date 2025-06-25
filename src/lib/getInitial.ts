export function getInitial(name: string): string {
    const names: string[] = name.split(' ');
    const initials: string[] = names.map((name) => name[0].toUpperCase());
    const result: string = initials.slice(0, 2).join('');
    return result;
}
