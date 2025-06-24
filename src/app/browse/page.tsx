'use client';

import { type JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { QuizzCard } from '@/components/QuizzCard';
import Filter from './_components/Filter';
import { useBrowseQuizzes, type useBrowseQuizzesType } from './hooks';

export default function BrowsePage(): JSX.Element {
    const {
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        selectedDifficulty,
        setSelectedDifficulty,
        sortBy,
        setSortBy,
        showFilters,
        setShowFilters,
        quizzes,
        loading,
        hasMore,
        handleShowMore,
    }: useBrowseQuizzesType = useBrowseQuizzes();

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Browse Quizzes</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover thousands of quizzes created by our community. Find your next challenge!
                    </p>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-8 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search quizzes, topics, or authors..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className="md:w-auto"
                            >
                                <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
                            </Button>
                        </div>
                        <AnimatePresence>
                            {showFilters && <Filter
                                setShowFilters={setShowFilters}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                selectedDifficulty={selectedDifficulty}
                                setSelectedDifficulty={setSelectedDifficulty}
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                setSearchTerm={setSearchTerm}
                            />}
                        </AnimatePresence>
                    </div>
                    <div className="mb-6">
                        <p className="text-muted-foreground">
                            Showing {quizzes.length} quiz{quizzes.length !== 1 ? 'es' : ''}
                            {searchTerm && ` for "${searchTerm}"`}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzes.map((quiz, index) => (
                            <motion.div
                                key={quiz.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                <QuizzCard quiz={quiz} hovered={false} />
                            </motion.div>
                        ))}
                    </div>
                    {quizzes.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <div className="text-muted-foreground mb-4">
                                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p className="text-lg">No quizzes found</p>
                                <p>Try adjusting your search terms or filters</p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('All Categories');
                                    setSelectedDifficulty('All Levels');
                                }}
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    )}
                    {hasMore && (
                        <div className="flex justify-center mt-8">
                            <Button onClick={handleShowMore} disabled={loading}>
                                {loading ? 'Loading...' : 'Show More'}
                            </Button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
