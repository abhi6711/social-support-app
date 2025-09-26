import React from 'react';
import { Box, Stepper, Step, StepLabel, Button } from '@mui/material';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Step1 from './wizard/Step1';
import Step2 from './wizard/Step2';
import Step3 from './wizard/Step3';
import { useTranslation } from 'react-i18next';

export default function Wizard() {
  const { t } = useTranslation();
  const steps = [
    t('steps.step1'),
    t('steps.step2'),
    t('steps.step3'),
  ];

  const stepPaths = ['/apply/step-1', '/apply/step-2', '/apply/step-3'];
  function getStepIndex(pathname: string): number {
  const index = stepPaths.findIndex((p) => pathname.startsWith(p));
  return index === -1 ? 0 : index;
  }
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeStep = getStepIndex(pathname);

  const goPrev = () => {
    if (activeStep > 0) navigate(stepPaths[activeStep - 1]);
  };
  const goNext = () => {
    if (activeStep < stepPaths.length - 1) navigate(stepPaths[activeStep + 1]);
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Routes>
        <Route path="step-1" element={<Step1 onNext={goNext} />} />
        <Route path="step-2" element={<Step2 onBack={goPrev} onNext={goNext} />} />
        <Route path="step-3" element={<Step3 onBack={goPrev} />} />
        <Route path="*" element={<Step1 onNext={goNext} />} />
      </Routes>

      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button disabled={activeStep === 0} onClick={goPrev} variant="outlined">
          {t('actions.back')}
        </Button>
        <Button disabled={activeStep === steps.length - 1} onClick={goNext} variant="contained">
          {t('actions.next')}
        </Button>
      </Box> */}
    </Box>
  );
}


