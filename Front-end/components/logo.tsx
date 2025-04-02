import Image from "next/image"


export function Logo({ size = "default" }: { size?: "default" | "small" | "large" }) {
  const dimensions = {
    small: { width: 32, height: 32 },
    default: { width: 65, height: 65 },
    large: { width: 80, height: 80 },
  }

  const { width, height } = dimensions[size]

  return (
    <div className="relative" style={{ width, height }}>
      <div className="absolute inset-0 bg-[#FFF] rounded-full flex items-center justify-center">
        {/* <div className="text-[#002F6C] font-serif font-bold" style={{ fontSize: width * 0.5 }}>
          SM
        </div> */}
        <Image
        src="/logo2.png"
        alt={"Logo"}
        fill
        // className="object-cover brightness-[0.7]"
        priority
        />
      </div>
    </div>
  )
}

