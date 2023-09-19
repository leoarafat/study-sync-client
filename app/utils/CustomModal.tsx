import React, { FC } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import styles from "./Modal.module.css";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute: (route: string) => void;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="max-w-md mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-slate-900 rounded-[8px] shadow outline-none mt-[100px]">
        <Component setOpen={setOpen} setRoute={setRoute} />
      </div>
    </Modal>
  );
};

export default CustomModal;
