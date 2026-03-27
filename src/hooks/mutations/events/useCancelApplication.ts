import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelApplication } from '@/api/events';

export function useCancelApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: number) => cancelApplication(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myApplications'] });
    },
  });
}
