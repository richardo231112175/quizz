import { type JSX } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

type HeaderProps = {
    title: string;
    color: string;
    bgColor: string;
};

export default function Header({ title, color, bgColor }: HeaderProps): JSX.Element {
    return (
        <div className="text-center mb-8">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mb-4"
            >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${bgColor} mb-4`}>
                    <Trophy className={`h-10 w-10 ${color}`} />
                </div>
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
            <p className="text-lg text-muted-foreground">{title}</p>
        </div>
    );
}
