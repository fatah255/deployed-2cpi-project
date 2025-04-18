import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";
import { Button } from "../../../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../components/ui/Dialog";

const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/empty.svg" alt="empty" width={200} height={200} />
      <h2 className="text-2xl font-semibold mt-6 text-blue-800">
        Welcome To Board !
      </h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Create Organization</Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
            <CreateOrganization routing="hash" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default EmptyOrg;
