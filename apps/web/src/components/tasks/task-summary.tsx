import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {Card} from "@/components/ui/card.tsx";

export default function TaskSummary() {
    const [summary, setSummary] = useState<string | null>(null);

    const fetchSummary = async () => {
        try {
            const response = await fetch("http://localhost:3000/ai/summary");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSummary(data.summary);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Card className="flex flex-col p-4 items-center gap-y-2 m-4">
            <p>{summary}</p>
            <Button onClick={fetchSummary}>
                Generate Summary
            </Button>
        </Card>
    )
}