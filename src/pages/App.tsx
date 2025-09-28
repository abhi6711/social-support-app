import React from 'react';
import { CssBaseline, ThemeProvider, createTheme, IconButton, Box } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import WizardLayout from '../components/WizardLayout';
import Wizard from './Wizard';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { FormProvider } from '../context/FormContext';
import TranslateIcon from '@mui/icons-material/Translate';

const theme = createTheme();

/**
 * Main application component with theme, routing, and language toggle functionality
 */
export default function App() {
  const { i18n, t } = useTranslation();
  /**
   * Toggle between English and Arabic languages with RTL support
   */
  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(next);
    document.dir = next === 'ar' ? 'rtl' : 'ltr';
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormProvider>
        <Box sx={{ position: 'fixed', top: 8, right: 8, zIndex: 1500 }}>
          <IconButton aria-label={t('openBadge')} onClick={toggleLang} size="large"><TranslateIcon /></IconButton>
        </Box>
        <Routes>
          <Route path="/" element={<Navigate to="/apply" replace />} />
          <Route element={<WizardLayout />}> 
            <Route path="/apply/*" element={<Wizard />} />
          </Route>
        </Routes>
      </FormProvider>
    </ThemeProvider>
  );
}


