import { useState } from "react";
import type { Votes, VoteType } from "../../types/votes";
import CafeInfo from "../CafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions";
import css from "./App.module.css";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";

export default function App() {
    const [votes, setVotes] = useState<Votes>({ good: 0, neutral: 0, bad: 0 });
    const totalVotes: number = votes.good + votes.bad + votes.neutral;
    const positiveRate = totalVotes
        ? Math.round((votes.good / totalVotes) * 100)
        : 0;

    function handleVote(type: VoteType): void {
        setVotes({
            ...votes,
            [type]: votes[type] + 1,
        });
    }

    function resetVotes() {
        setVotes({ good: 0, neutral: 0, bad: 0 });
    }
    return (
        <div className={css.app}>
            <CafeInfo />
            <VoteOptions
                onVote={handleVote}
                onReset={resetVotes}
                canReset={totalVotes ? true : false}
            />
            {totalVotes ? (
                <VoteStats
                    votes={votes}
                    totalVotes={totalVotes}
                    positiveRate={positiveRate}
                />
            ) : (
                <Notification />
            )}
        </div>
    );
}
