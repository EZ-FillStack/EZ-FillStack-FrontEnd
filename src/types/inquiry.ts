//고객 센터
export type Inquiry = {
    id: number;
    memberId: number;
    title: string;
    content: string;
    replyEmail: string;
    status: 'UNANSWERED' | 'ANSWERED';
    createdAt: string;
    answeredAt: string | null;
};
