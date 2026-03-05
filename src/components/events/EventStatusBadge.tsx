import React from 'react';
import { Badge } from "@/components/ui/badge"

type EventStatusBadgeProps = {
    status: string;
    applyEndDateTime: string;
    eventStartDateTime?: string;
};

const EventStatusBadge = ({ status, applyEndDateTime, eventStartDateTime }: EventStatusBadgeProps) => {
    const now = new Date();
    const applyEnd = new Date(applyEndDateTime);
    const diffHours = (applyEnd.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (eventStartDateTime) {
        const eventStart = new Date(eventStartDateTime);
        const comingDays = Math.ceil((eventStart.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        if (comingDays && comingDays > 0) {
            return <Badge variant="default">D-{comingDays}</Badge>;
        }
    }

    if (status !== 'OPEN') {
        return <Badge variant="default">마감</Badge>
    }

    if (diffHours <= 24 && diffHours > 0) {
        return <Badge variant="warning">마감 임박</Badge>
    }

    return <Badge variant="success">신청 가능</Badge>
};

export default EventStatusBadge;
