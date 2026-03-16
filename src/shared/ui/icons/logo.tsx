import logoSvg from "./logo.svg?url";

export function Logo({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"img">) {
  return (
    <img
      src={logoSvg}
      alt=""
      width={56}
      height={56}
      className={className}
      {...props}
    />
  );
}
