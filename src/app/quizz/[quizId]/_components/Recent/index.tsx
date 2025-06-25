import { type JSX } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar';
import type { userType, playType } from '../../page';
import { getInitial } from '@/lib/getInitial';

type RecentProps = {
    users: userType[];
    plays: playType[];
};

export default function Recent({ users, plays }: RecentProps): JSX.Element {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" /> Recent Scores
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {users.length ? users.map((user, index) => {
                    const time: number = plays[index].finish_time.getTime();
                    const timeOffset: number = plays[index].finish_time.getTimezoneOffset() * 60000;
                    const distance: string = formatDistanceToNow(new Date(time + timeOffset), { addSuffix: true });

                    return (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.imageUrl} alt={user.name} />
                                    <AvatarFallback className="text-xs">{getInitial(user.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium text-sm">{user.name}</div>
                                    <div className="text-xs text-muted-foreground">{distance}</div>
                                </div>
                            </div>
                            <Badge variant={plays[index].final_score >= 90 ? 'default' : plays[index].final_score >= 70 ? 'secondary' : 'outline'}>
                                {plays[index].final_score}%
                            </Badge>
                        </div>
                    );
                }) : <span className="text-sm text-muted-foreground">No recent scores yet. Be the first to complete this quiz!</span>}
            </CardContent>
        </Card>
    );
}
