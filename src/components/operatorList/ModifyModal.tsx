import React from 'react';

import Modal from 'src/components/operatorList/Modal';
import ModifyForm from 'src/components/operatorList/ModifyForm';
import OperatorVO from 'src/vo/OperatorVO';

type ModifyModalProps = {
  open: boolean;
  onOpen: () => void;
  operator: OperatorVO;
};

function ModifyModal({ open, onOpen, operator }: ModifyModalProps) {
  return (
    <Modal open={open} onOpen={onOpen} title="운영자 정보 수정" maxWidth="md">
      <ModifyForm operator={operator} onOpen={onOpen} />
    </Modal>
  );
}

export default ModifyModal;
