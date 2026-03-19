import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

type ProfileEditorModalState = {
  isOpen: boolean;
};

type ProfileEditorModalActions = {
  actions: {
    open: () => void;
    close: () => void;
  };
};

type ProfileEditorModalStore = ProfileEditorModalState &
  ProfileEditorModalActions;

const initialState: ProfileEditorModalState = {
  isOpen: false,
};

const useProfileEditorModalStore = create<ProfileEditorModalStore>()(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
      },
    })),
    { name: 'ProfileEditorModalStore' },
  ),
);

export default useProfileEditorModalStore;

export const useProfileEditorModal = () => {
  const isOpen = useProfileEditorModalStore((state) => state.isOpen);
  const actions = useProfileEditorModalStore((state) => state.actions);

  return {
    isOpen,
    actions,
  };
};

export const useOpenProfileEditorModal = () =>
  useProfileEditorModalStore((state) => state.actions.open);

export const useCloseProfileEditorModal = () =>
  useProfileEditorModalStore((state) => state.actions.close);