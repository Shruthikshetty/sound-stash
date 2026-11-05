import { Music2Icon } from "lucide-react";

function AppLogo({
  showName = true,
  ghost = false,
}: {
  showName?: boolean;
  ghost?: boolean;
}) {
  return (
    <div className="flex flex-row items-center gap-1">
      <div
        className={`rounded-md p-2  ${ghost ? "bg-primary/30" : "bg-primary"}`}
      >
        <Music2Icon
          size={20}
          strokeWidth={2.6}
          color={ghost ? "hsl(7 100% 69%)" : "black"}
        />
      </div>
      {showName && (
        <h1 className="font-semibold text-xl">
          sonora<b className="text-primary"> .</b>
        </h1>
      )}
    </div>
  );
}

export default AppLogo;
