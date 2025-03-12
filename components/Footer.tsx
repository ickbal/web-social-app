import { FC } from "react"

interface Props {
  error?: number
}

const Footer: FC<Props> = ({ error }) => {
  return (
    <footer className={"flex flex-col bg-dark-900 py-1 px-4"}>
      {error && <div>Error {error}</div>}
      <div className={"text-sm flex flex-col gap-1 sm:flex-row sm:items-center"}>
        <div className={"flex flex-row items-center"}>
          <IconCopyright sizeClassName={"h-3 w-3"}/>
        </div>
      </div>
    </footer>
  )
}

export default Footer
