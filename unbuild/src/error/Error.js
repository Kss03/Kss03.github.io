import { Spinner } from "react-bootstrap"

export default function Error() {
  return (
    <Spinner className="position-fixed start-50 top-50" animation="grow" variant="danger" />
  )
}