import { Spinner } from "react-bootstrap"

export default function Loading() {
  return (
    <Spinner className="position-fixed start-50 top-50" animation="border" variant="secondary"/>
  )
}