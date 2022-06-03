import { useAtom, useSetAtom } from "jotai";
import { RESET } from "jotai/utils";

import TableToolbarButton from "@src/components/TableToolbar/TableToolbarButton";
import { CloudLogs as LogsIcon } from "@src/assets/icons";
import CloudLogsModal from "./CloudLogsModal";

import {
  globalScope,
  projectSettingsAtom,
  rowyRunModalAtom,
} from "@src/atoms/globalScope";
import { tableScope, tableModalAtom } from "@src/atoms/tableScope";

export default function CloudLogs() {
  const [projectSettings] = useAtom(projectSettingsAtom, globalScope);
  const openRowyRunModal = useSetAtom(rowyRunModalAtom, globalScope);
  const [modal, setModal] = useAtom(tableModalAtom, tableScope);

  const open = modal === "cloudLogs";
  const setOpen = (open: boolean) => setModal(open ? "cloudLogs" : RESET);

  return (
    <>
      <TableToolbarButton
        title="Cloud logs"
        icon={<LogsIcon />}
        onClick={
          projectSettings.rowyRunUrl
            ? () => setOpen(true)
            : () => openRowyRunModal({ feature: "Cloud logs" })
        }
      />

      {open && (
        <CloudLogsModal onClose={() => setOpen(false)} title="Cloud logs" />
      )}
    </>
  );
}