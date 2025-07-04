import { Button, CustomTable, generateColumns } from '@/presentation/components';
import { useDrawerStore } from '@/data/stores/drawer.store';
import { useModalStore } from '@/data/stores/modal.store';
import { ModalConfirm } from '@/presentation/components/internal/modals/modal-confirm';
import { ModalsId } from '@/domain/constants/modals-id';
import { toast } from '@/hooks/use-toast';
import { DrawerExample } from '@/presentation/components/internal/drawers/drawer-example';

export function PageA() {
  const { openModal, closeModal } = useModalStore();
  const { openDrawer, closeDrawer } = useDrawerStore();

  const exampleToast = () => {
    toast({
      title: 'Erro',
      description: 'Tente novamente mais tarde.',
      variant: 'error',
    });
  };

  const exampleDrawer = () => {
    openDrawer({
      id: 'drawer-example',
      children: (
        <DrawerExample
          closeModal={() => {
            closeDrawer('drawer-example');
          }}
        />
      ),
      onClose: () => {
        console.log('Drawer closed');
      },
    });
  };

  const exampleModal = () => {
    openModal({
      id: ModalsId.CONFIRMATION_MODAL,
      children: (
        <ModalConfirm
          title='Example'
          message='Click to close'
          onConfirm={() => closeModal(ModalsId.CONFIRMATION_MODAL)}
          textButtonConfirm='Close'
        />
      ),
    });
  };

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-5 p-5'>
      <div className='w-250'>
        <CustomTable
          columns={generateColumns({
            titles: ['Column 1', 'Column 2', 'Column 3'],
          })}
          data={[]}
        />
      </div>
      <Button onClick={exampleToast}>Open Toast</Button>
      <Button onClick={exampleModal}>Open Modal</Button>
      <Button onClick={exampleDrawer}>Open Drawer</Button>
    </div>
  );
}
