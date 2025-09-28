import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import { useFormData } from '../../context/FormContext';
import { useTranslation } from 'react-i18next';

type Step2Values = {
  maritalStatus: string;
  dependents: number;
  employmentStatus: string;
  monthlyIncome: number;
  housingStatus: string;
};

/**
 * Second step of the wizard collecting family and financial information with validation
 */
export default function Step2({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { data, update } = useFormData();
  const { register, handleSubmit, formState: { errors } } = useForm<Step2Values>({
    defaultValues: data.family,
    mode: 'onBlur',
  });

  /**
   * Handle form submission by updating global state and proceeding to next step
   */
  const onSubmit = (values: Step2Values) => {
    update({ family: values });
    onNext();
  };

  const { t } = useTranslation();
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} aria-label={t('step2.title')}>
      <Typography variant="h6" sx={{ mb: 2 }}>{t('step2.title')}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField 
            label={t('step2.maritalStatus')} 
            fullWidth 
            {...register('maritalStatus', { 
              required: 'Marital status is required',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'Marital status should contain only letters and spaces'
              }
            })} 
            error={!!errors.maritalStatus} 
            helperText={errors.maritalStatus?.message} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label={t('step2.dependents')} 
            type="number" 
            fullWidth 
            {...register('dependents', { 
              required: 'Number of dependents is required',
              min: { 
                value: 0, 
                message: 'Dependents cannot be negative' 
              },
              max: {
                value: 20,
                message: 'Please enter a reasonable number of dependents'
              },
              valueAsNumber: true
            })} 
            error={!!errors.dependents} 
            helperText={errors.dependents?.message} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label={t('step2.employmentStatus')} 
            fullWidth 
            {...register('employmentStatus', { 
              required: 'Employment status is required',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'Employment status should contain only letters and spaces'
              }
            })} 
            error={!!errors.employmentStatus} 
            helperText={errors.employmentStatus?.message} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label={t('step2.monthlyIncome')} 
            type="number" 
            fullWidth 
            {...register('monthlyIncome', { 
              required: 'Monthly income is required',
              min: { 
                value: 0, 
                message: 'Income cannot be negative' 
              },
              max: {
                value: 1000000,
                message: 'Please enter a reasonable income amount'
              },
              valueAsNumber: true
            })} 
            error={!!errors.monthlyIncome} 
            helperText={errors.monthlyIncome?.message} 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label={t('step2.housingStatus')} 
            fullWidth 
            {...register('housingStatus', { 
              required: 'Housing status is required',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'Housing status should contain only letters and spaces'
              }
            })} 
            error={!!errors.housingStatus} 
            helperText={errors.housingStatus?.message} 
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack} variant="outlined">{t('actions.back')}</Button>
        <Button type="submit" variant="contained">{t('actions.continue')}</Button>
      </Box>
    </Box>
  );
}


