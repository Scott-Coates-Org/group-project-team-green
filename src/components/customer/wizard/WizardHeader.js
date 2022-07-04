import { Progress } from "reactstrap"
import { Wizard, useWizard } from "react-use-wizard"

const WizardHeader = () => {
  const { activeStep, stepCount } = useWizard()
  let progressPercentage = 34
  return (
    <div>
      <Progress color="success" value={activeStep * progressPercentage} />
      <h1>
        Step {activeStep + 1} of {stepCount}
      </h1>
    </div>
  )
}

export default WizardHeader
