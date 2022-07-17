import React from 'react';
import { useWizard } from 'react-use-wizard';
import { Button } from 'reactstrap';

const WizardFooter = () => {
    const { isFirstStep, isLastStep, nextStep, previousStep } = useWizard();

    return (
        <div>
            {!isFirstStep ?
                <Button
                    color="primary"
                    size="lg"
                    onClick={() => nextStep()}
                >Previous
                </Button>
                : null
            }
            {!isLastStep ?
                <Button
                    color="primary"
                    size="lg"
                    onClick={() => previousStep()}
                >Next</Button> : null}
        </div>
    )
}

export default WizardFooter