import logo from "@/assets/logo.png";

export function BrandLogo({ size = 32 }: { size?: number }) {
  return (
    <img
      src={logo}
      alt="Lumen AI"
      width={size}
      height={size}
      loading="lazy"
      className="rounded-lg shadow-sm"
      style={{ width: size, height: size }}
    />
  );
}
