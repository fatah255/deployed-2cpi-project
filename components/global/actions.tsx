"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import ConfirmModal from "./ConfirmModal";
import { Button } from "../ui/Button";
import { useRenameModal } from "@/store/use-rename";

interface actionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

const Actions = ({ children, side, sideOffset, id, title }: actionsProps) => {
  const { onOpen } = useRenameModal();

  // a function to copy the link
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  // a function to delete endpoint
  const remove = useMutation(api.board.remove);

  //a function to delete the board
  const onDelete = () => {
    // @ts-ignore
    remove({ id })
      .then(() => {
        toast.success("Board deleted");
      })
      .catch(() => {
        toast.error("Failed to delete board");
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60 "
      >
        {/* show the copy link option */}
        <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
          <Link2 className="w-4 h-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        {/* show the rename modal */}
        <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className="p-3 cursor-pointer"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Rename
        </DropdownMenuItem>
        {/* before deletion it must to show a confirm modal to confirm the deletion */}
        <ConfirmModal
          header="Delete Board ?"
          description="this will delete the board and all its content"
          onConfirm={onDelete}
        >
          {/* show the delete option */}

          <Button
            variant="ghost"
            className="p-3 flex w-full !justify-start !items-center"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
