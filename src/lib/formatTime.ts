export function formatTime(time: Date): string {
    return new Date(time).toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
}

export function formatCountDown(seconds: number): string {
    const mins: number = Math.floor(seconds / 60);
    const secs: number = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export function formatTimeSpent(seconds: number): string {
    const mins: number = Math.floor(seconds / 60);
    const secs: number = seconds % 60;
    return `${mins}m ${secs}s`;
};
