import * as React from "react"
import SignatureCanvas from "react-signature-canvas"
import { Button } from "reactstrap"
import { useForm } from "react-hook-form"
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Col,
  Container,
  Row,
} from "reactstrap"

const WAIVER_TEXT = {
  TITLE: {
    FORM: "Waiver Form",
    RELEASE:
      "PARTICIPANT AGREEMENT, INDEMNIFICATION, ASSUMPTION OF RISK, AND RELEASE OF LIABILITY",
    RISKS: "ASSUMPTION AND ACKNOWLEDGEMENT OF ALL RISKS",
  },
  INTRO:
    "In order to save time when you arrive, you may fill out and sign your liability waiver in advance. Please note that you must be at least 18 years old in order to sign a liability waiver. If you are not 18 years old, please ask your parent or legal guardian to complete this process.",
  RELEASE:
    "In consideration of the services of ROLLER WORLD, together with all agents, owners, managers, successors, affiliates, sponsors, landlords, partners, investors, participants, volunteers, employees, and all other persons or entities acting in any capacity on behalf of the previously named company, I hereby agree to release, indemnify, and discharge the venue, on behalf of myself, my spouse, my children, my parents, my heirs, my wards, assigns, personal representatives and estate.",
  RISKS:
    'I, the undersigned adult listed below, am at least 18 years of age. On my own behalf, and on the behalf of the below listed participants under the age of 18 ("minors"), as their parent, legal guardian or custodian, knowingly, voluntarily, and freely accept and assume any and all risks, both known and unknown, of injuries or other loss or damage that may be suffered while on the premises.',
}

const Waiver = () => {
  const canvasRef = React.useRef()
  const {
    register,
    handleSubmit,
    setValue: setFormValue,
    setError: setFormError,
    clearErrors: clearFormErrors,
    formState: { errors },
  } = useForm()
  const { agreeReleaseRef, ...agreeReleaseRest } = register("isAgreedRelease", {
    required: true,
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Card className="rounded-0">
      <CardHeader>
        <h1>{WAIVER_TEXT.TITLE.FORM}</h1>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <div>
            <p>{WAIVER_TEXT.INTRO}</p>
            <p>{WAIVER_TEXT.TITLE.RELEASE}</p>
            {errors && errors.isAgreedRelease && (
              <Badge color="danger">You have to agree.</Badge>
            )}
            <Container>
              <Row>
                <Col className="col-auto">
                  <input
                    type="checkbox"
                    ref={agreeReleaseRef}
                    onChange={() => {
                      const checkDate = agreeReleaseRef.current.checked
                        ? new Date().toISOString()
                        : null

                      setFormValue("agreedReleaseAt", checkDate)
                    }}
                    {...agreeReleaseRest}
                  />
                </Col>
                <Col>
                  <p>{WAIVER_TEXT.RELEASE}</p>
                </Col>
              </Row>
            </Container>
            <p>{WAIVER_TEXT.TITLE.RISKS}</p>
            <p>{WAIVER_TEXT.RISKS}</p>
          </div>
          <p>Please sign here:</p>
          <style>
            {`.waiver-sign-canvas {
                display: block;
                border-radius: 8px;
                border: 2px dotted gray;
                margin: 8px auto;
            }`}
          </style>
          <SignatureCanvas
            ref={canvasRef}
            onEnd={() => {
              clearFormErrors("signatureSrc")
              setFormValue("signedAt", new Date().toISOString())
            }}
            canvasProps={{
              width: 500,
              height: 200,
              className: "waiver-sign-canvas",
            }}
          />
          <div style={{ textAlign: "center" }}>
            <Button
              size="sm"
              onClick={() => {
                canvasRef.current.clear()
              }}
            >
              Clear
            </Button>
            {errors && errors.signatureSrc && (
              <Badge color="danger" style={{ margin: "0 8px" }}>
                You have to sign.
              </Badge>
            )}
          </div>
        </CardBody>
        <CardFooter>
          <Button
            color="primary"
            type="submit"
            onClick={(e) => {
              if (canvasRef.current.isEmpty()) {
                setFormError("signatureSrc", "Waiver has to be signed!")
                return
              }

              setFormValue(
                "signatureSrc",
                canvasRef.current.getTrimmedCanvas().toDataURL("image/svg+xml")
              )

              setFormValue("submittedAt", new Date().toISOString())

              setFormValue("userAgent", navigator.userAgent)
              setFormValue("clientLanguage", navigator.language)
              setFormValue(
                "timezone",
                Intl.DateTimeFormat().resolvedOptions().timeZone
              )
              setFormValue(
                "windowScreen",
                `${window.screen.width}x${window.screen.height}`
              )
              setFormValue("windowLocation", window.location.href)
              setFormValue(
                "platform",
                navigator.userAgentData?.platform ?? navigator.platform ?? null
              )
            }}
          >
            Accept and continue
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default Waiver
