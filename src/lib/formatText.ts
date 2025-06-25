export function formatText(text: string): string {
    const firstLetter: string = text[0].toUpperCase();
    const letters: string = text.slice(1, text.length).toLowerCase();
    return firstLetter + letters;
}
