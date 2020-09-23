import React from 'react'

import './DialogComponent.sass'
import ReactModal from 'react-modal'
import ScrollLock from 'react-scrolllock'
import close_img from '../../../Assets/close.svg'

interface DialogComponentProps {
    isOpen: boolean
    close(): void
}

const DialogComponent: React.FC<DialogComponentProps> = props => {
    const { isOpen, close, children } = props
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={close}
            style={{
                overlay: {
                    backgroundColor: 'rgba(64, 35, 87, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                content: {
                    position: 'static',
                    minWidth: '400px',
                    backgroundColor: '#e7c9ff',
                },
            }}>
            <div className='dialog-wrapper'>
                <div className='dialog-close' onClick={close}>
                    <img src={close_img} alt='close' />
                </div>
                {children}
            </div>
            <ScrollLock isActive={isOpen} />
        </ReactModal>
    )
}

export default DialogComponent
