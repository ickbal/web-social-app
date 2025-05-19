// components/icon/IconCopyright.tsx
import { FC } from "react"

interface Props {
  sizeClassName?: string
}

const IconCopyright: FC<Props> = ({ sizeClassName = "" }) => (
  <svg className={sizeClassName} /* SVG props here */ viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10... (etc)" />
  </svg>
)

export default IconCopyright