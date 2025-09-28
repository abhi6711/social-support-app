import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Grid, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import { getSuggestion, buildPrompt } from '../../services/openai';
import { useFormData } from '../../context/FormContext';
import { submitApplication } from '../../services/api';
import { useTranslation } from 'react-i18next';

type Step3Values = {
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
};

/**
 * Third step of the wizard collecting situation descriptions with AI-assisted writing capabilities
 */
export default function Step3({ onBack }: { onBack: () => void }) {
  const { data, update } = useFormData();
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<Step3Values>({
    defaultValues: data.situations,
    mode: 'onBlur',
  });
  const [suggestion, setSuggestion] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [targetField, setTargetField] = useState<keyof Step3Values | null>(null);
  const [loadingField, setLoadingField] = useState<keyof Step3Values | null>(null);
  const [errorOpen, setErrorOpen] = useState(false);

  /**
   * Request AI assistance for the specified field with error handling and fallback to mock suggestions
   */
  const requestHelp = async (field: keyof Step3Values) => {
    setLoadingField(field);
    try {
      const controller = new AbortController();
      const prompt = buildPrompt(field as any);
      const text = await getSuggestion(prompt, controller.signal);
      setSuggestion(text);
      setTargetField(field);
      setOpen(true);
    } catch (err) {
      setSuggestion('');
      setTargetField(null);
      setOpen(false);
      setErrorOpen(true);
    } finally {
      setLoadingField(null);
    }
  };

  /**
   * Handle final form submission by updating global state and submitting the complete application
   */
  const onSubmit = async (values: Step3Values) => {
    update({ situations: values });
    await submitApplication({ ...data, situations: values });
    alert('Submitted!');
  };

  const { t } = useTranslation();
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} aria-label={t('step3.title')}>
      <Typography variant="h6" sx={{ mb: 2 }}>{t('step3.title')}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            label={t('step3.financialSituation')} 
            fullWidth 
            multiline 
            minRows={4}
            {...register('financialSituation', {
              required: 'Financial situation description is required',
              minLength: {
                value: 20,
                message: 'Please provide at least 20 characters describing your financial situation'
              },
              maxLength: {
                value: 1000,
                message: 'Description cannot exceed 1000 characters'
              },
              validate: {
                noNumbers: (value) => {
                  const hasNumbers = /\d/.test(value);
                  if (hasNumbers) return 'Please describe in words rather than using numbers';
                  return true;
                }
              }
            })}
            error={!!errors.financialSituation}
            helperText={errors.financialSituation?.message}
          />
          <Button onClick={() => requestHelp('financialSituation')} sx={{ mt: 1 }} disabled={loadingField==='financialSituation'}>{t('actions.help')}</Button>
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label={t('step3.employmentCircumstances')} 
            fullWidth 
            multiline 
            minRows={4}
            {...register('employmentCircumstances', {
              required: 'Employment circumstances description is required',
              minLength: {
                value: 20,
                message: 'Please provide at least 20 characters describing your employment circumstances'
              },
              maxLength: {
                value: 1000,
                message: 'Description cannot exceed 1000 characters'
              },
              validate: {
                noNumbers: (value) => {
                  const hasNumbers = /\d/.test(value);
                  if (hasNumbers) return 'Please describe in words rather than using numbers';
                  return true;
                }
              }
            })}
            error={!!errors.employmentCircumstances}
            helperText={errors.employmentCircumstances?.message}
          />
          <Button onClick={() => requestHelp('employmentCircumstances')} sx={{ mt: 1 }} disabled={loadingField==='employmentCircumstances'}>{t('actions.help')}</Button>
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label={t('step3.reasonForApplying')} 
            fullWidth 
            multiline 
            minRows={4}
            {...register('reasonForApplying', {
              required: 'Reason for applying description is required',
              minLength: {
                value: 20,
                message: 'Please provide at least 20 characters explaining your reason for applying'
              },
              maxLength: {
                value: 1000,
                message: 'Description cannot exceed 1000 characters'
              },
              validate: {
                noNumbers: (value) => {
                  const hasNumbers = /\d/.test(value);
                  if (hasNumbers) return 'Please describe in words rather than using numbers';
                  return true;
                }
              }
            })}
            error={!!errors.reasonForApplying}
            helperText={errors.reasonForApplying?.message}
          />
          <Button onClick={() => requestHelp('reasonForApplying')} sx={{ mt: 1 }} disabled={loadingField==='reasonForApplying'}>{t('actions.help')}</Button>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack} variant="outlined">{t('actions.back')}</Button>
        <Button type="submit" variant="contained">{t('actions.submit')}</Button>
      </Box>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        aria-labelledby="ai-suggestion-title"
        maxWidth="lg"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            minWidth: '50vw',
            maxWidth: '80vw',
            width: 'auto',
          }
        }}
      >
        <DialogTitle id="ai-suggestion-title">{t('step3.aiTitle')}</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth 
            multiline 
            minRows={8} 
            maxRows={12}
            value={suggestion} 
            onChange={(e) => setSuggestion(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{t('actions.discard')}</Button>
          <Button onClick={() => { setOpen(false); if (targetField) { setValue(targetField, suggestion); update({ situations: { ...getValues() } as any }); } }}>{t('actions.accept')}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={errorOpen} autoHideDuration={4000} onClose={() => setErrorOpen(false)}>
        <Alert severity="error" onClose={() => setErrorOpen(false)}>{t('step3.aiError')}</Alert>
      </Snackbar>
    </Box>
  );
}


