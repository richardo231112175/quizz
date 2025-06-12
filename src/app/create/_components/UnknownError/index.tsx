import { type JSX } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Card } from '@/components/Card';

export default function UnknownError(): JSX.Element {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                },
            }}
            exit={{
                opacity: 0,
                y: -20,
                transition: {
                    duration: 0.2,
                },
            }}
        >
            <Card className="mb-6 border-red-500">
                <div className="p-4 flex items-center gap-2 text-red-500">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <p className="text-sm">Unknown error occurred</p>
                </div>
            </Card>
        </motion.div>
    );
}
