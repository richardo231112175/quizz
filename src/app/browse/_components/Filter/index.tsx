import { type JSX, type Dispatch, type SetStateAction } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';

type sortType = {
    value: string;
    label: string;
};

type FilterProps = {
    setShowFilters: Dispatch<SetStateAction<boolean>>;
    selectedCategory: string;
    setSelectedCategory: Dispatch<SetStateAction<string>>;
    selectedDifficulty: string;
    setSelectedDifficulty: Dispatch<SetStateAction<string>>;
    sortBy: string;
    setSortBy: Dispatch<SetStateAction<string>>;
    setSearchTerm: Dispatch<SetStateAction<string>>;
};

export default function Filter({ setShowFilters, selectedCategory, setSelectedCategory, selectedDifficulty, setSelectedDifficulty, sortBy, setSortBy, setSearchTerm }: FilterProps): JSX.Element {
    const categories: string[] = [
        'All Categories',
        'Science',
        'History',
        'Geography',
        'Technology',
        'Arts',
        'Sports',
        'Music',
        'Health',
        'Entertainment',
    ];

    const difficulties: string[] = [
        'All Levels',
        'Easy',
        'Medium',
        'Hard',
    ];

    const sorts: sortType[] = [
        { value: 'popular', label: 'Most Popular' },
        { value: 'rating', label: 'Highest Rated' },
        { value: 'latest', label: 'Latest' },
        { value: 'oldest', label: 'Oldest' },
        { value: 'shortest', label: 'Shortest' },
        { value: 'longest', label: 'Longest' },
    ];

    const filterFieldVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.05 * i } }),
        exit: { opacity: 0, y: 20, transition: { duration: 0.15 } },
    };

    return (
        <motion.div
            key="filters"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg"
        >
            <Button
                aria-label="Close filters"
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 z-10"
                onClick={() => setShowFilters(false)}
            >
                <X className="h-5 w-5" />
            </Button>
            <AnimatePresence>
                <motion.div
                    key="category"
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={filterFieldVariants}
                    className="space-y-2"
                >
                    <label className="text-sm font-medium">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category: string) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </motion.div>
            </AnimatePresence>
            <AnimatePresence>
                <motion.div
                    key="difficulty"
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={filterFieldVariants}
                    className="space-y-2"
                >
                    <label className="text-sm font-medium">Difficulty</label>
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {difficulties.map((difficulty: string) => (
                                <SelectItem key={difficulty} value={difficulty}>
                                    {difficulty}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </motion.div>
            </AnimatePresence>
            <AnimatePresence>
                <motion.div
                    key="sort"
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={filterFieldVariants}
                    className="space-y-2"
                >
                    <label className="text-sm font-medium">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {sorts.map((option: { value: string; label: string }) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </motion.div>
            </AnimatePresence>
            <AnimatePresence>
                <motion.div
                    key="clear"
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={filterFieldVariants}
                    className="flex items-end"
                >
                    <Button
                        variant="outline"
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('All Categories');
                            setSelectedDifficulty('All Levels');
                            setSortBy('popular');
                        }}
                        className="w-full"
                    >
                        Clear Filters
                    </Button>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
