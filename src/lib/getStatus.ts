export type Status = {
    status: string;
    className: string;
};

export function getStatus(openTime: Date, closeTime: Date): Status {
    const now: Date = new Date();

    if (now < openTime) {
        return { status: 'Upcoming', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' };
    } else if (now > closeTime) {
        return { status: 'Ended', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300' };
    } else {
        return { status: 'Active', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' };
    }
}
