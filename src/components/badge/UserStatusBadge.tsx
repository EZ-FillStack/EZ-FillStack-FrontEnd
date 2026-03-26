import { Badge } from '@/components/ui/badge';

type UserStatusBadgeProps = {
    status:
    | 'ACTIVE'
    | 'BANNED'
    | 'DELETED'
}

const UserStatusBadge = ({status}:UserStatusBadgeProps) => {
    switch (status) {
        case 'ACTIVE' :
            return(
                <Badge variant="success">
                    활동중
                </Badge>
            );
        case 'BANNED' :
            return(
                <Badge variant="fail">
                    정지
                </Badge>
            );
        case 'DELETED' :
            return(
                <Badge variant="default">
                    탈퇴
                </Badge>
            );
    }
}

export default UserStatusBadge