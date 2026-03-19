import React from 'react';
import { Badge } from "@/components/ui/badge";

type MyStatusBadgeProps = {
    status: 'APPROVED'|'FAILED'|'OPEN'|'CLOSED'|'PENDING'|'COMPLETED';
}

const MyStatusBadge = ({status}: MyStatusBadgeProps) => {
    switch (status) {
        case 'APPROVED':
            return <Badge variant="success" size="lg">신청 완료</Badge>;
        case 'FAILED' :
            return <Badge variant="fail" size="lg">신청 실패</Badge>;
        case 'OPEN' :
            return <Badge variant="info" size="lg">모집중</Badge>;
        case 'CLOSED' :
            return <Badge variant="default" size="lg">마감</Badge>;
        case 'PENDING' :
            return <Badge variant="warning" size="lg">대기중</Badge>;
        case 'COMPLETED' :
            return <Badge variant="default" size="lg">체험 완료</Badge>;

        default: return <Badge variant="default">{status}</Badge>;
    }
};

export default MyStatusBadge;
