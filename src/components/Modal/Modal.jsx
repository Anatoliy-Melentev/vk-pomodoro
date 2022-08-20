import React, { useContext, useState } from 'react';
import styles from './modal.sass';
import {
  ModalPage, ModalPageHeader, ModalRoot, PanelHeaderClose, PanelHeaderSubmit, useAdaptivity, ViewWidth,
} from '@vkontakte/vkui';
import { Settings } from '../Settings';
import { ROUTES, settingsContext } from '../../context/settingsContext';
import { Info } from '../Info';

export function Modal() {
  const { viewWidth } = useAdaptivity();
  const isMobile = viewWidth <= ViewWidth.MOBILE;
  const { activeModal, setActiveModal } = useContext(settingsContext);

  return (
    <ModalRoot
      activeModal={activeModal}
      onClose={() => setActiveModal(null)}
    >
      <ModalPage
        id={ROUTES.SETTINGS}
        onClose={() => setActiveModal(null)}
        header={
          <ModalPageHeader
            before={<PanelHeaderClose onClick={() => setActiveModal(null)} />}
            after={<PanelHeaderSubmit onClick={() => setActiveModal(null)} />}
            className="modal-header"
          >
            Настройки
          </ModalPageHeader>
        }
      >
        <Settings />
      </ModalPage>
      <ModalPage
        id={ROUTES.INFO}
        onClose={() => setActiveModal(null)}
        header={
          <ModalPageHeader
            before={<PanelHeaderClose onClick={() => setActiveModal(null)} />}
            after={<PanelHeaderSubmit onClick={() => setActiveModal(null)} />}
            className="modal-header"
          >
            Правила
          </ModalPageHeader>
        }
      >
        <Info />
      </ModalPage>
    </ModalRoot>
  );
}
