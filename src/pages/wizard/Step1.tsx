import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import { useFormData } from '../../context/FormContext';
import { useTranslation } from 'react-i18next';

type Step1Values = {
  name: string;
  nationalId: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
};

/**
 * First step of the wizard collecting personal information with comprehensive validation
 */
export default function Step1({ onNext }: { onNext: () => void }) {
  const { data, update } = useFormData();
  const { register, handleSubmit, formState: { errors } } = useForm<Step1Values>({
    defaultValues: data.personal,
    mode: 'onBlur',
  });

  /**
   * Handle form submission by updating global state and proceeding to next step
   */
  const onSubmit = (values: Step1Values) => {
    update({ personal: values });
    onNext();
  };

  const { t } = useTranslation();
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} aria-label={t('step1.title')}>
      <Typography variant="h6" sx={{ mb: 2 }}>{t('step1.title')}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField 
            label={t('step1.name')} 
            fullWidth 
            {...register('name', { 
              required: 'Name is required',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'Name should contain only letters and spaces'
              },
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
              }
            })} 
            error={!!errors.name} 
            helperText={errors.name?.message} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label={t('step1.nationalId')} 
            fullWidth 
            {...register('nationalId', { 
              required: 'National ID is required',
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: 'National ID should contain only letters and numbers'
              },
              minLength: {
                value: 5,
                message: 'National ID must be at least 5 characters'
              }
            })} 
            error={!!errors.nationalId} 
            helperText={errors.nationalId?.message} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            type="date" 
            label={t('step1.dob')} 
            InputLabelProps={{ shrink: true }} 
            fullWidth 
            {...register('dateOfBirth', { 
              required: 'Date of birth is required',
              validate: {
                validDate: (value) => {
                  const date = new Date(value);
                  const today = new Date();
                  const age = today.getFullYear() - date.getFullYear();
                  if (age < 16) return 'Must be at least 16 years old';
                  if (age > 120) return 'Please enter a valid date';
                  return true;
                }
              }
            })} 
            error={!!errors.dateOfBirth} 
            helperText={errors.dateOfBirth?.message} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label={t('step1.gender')} 
            fullWidth 
            {...register('gender', { 
              required: 'Gender is required',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'Gender should contain only letters'
              }
            })} 
            error={!!errors.gender} 
            helperText={errors.gender?.message} 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label={t('step1.address')} 
            fullWidth 
            {...register('address', { 
              required: 'Address is required',
              minLength: {
                value: 10,
                message: 'Address must be at least 10 characters'
              }
            })} 
            error={!!errors.address} 
            helperText={errors.address?.message} 
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
            label={t('step1.city')} 
            fullWidth 
            {...register('city', { 
              required: 'City is required',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'City should contain only letters and spaces'
              }
            })} 
            error={!!errors.city} 
            helperText={errors.city?.message} 
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
            label={t('step1.state')} 
            fullWidth 
            {...register('state', { 
              required: 'State is required',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'State should contain only letters and spaces'
              }
            })} 
            error={!!errors.state} 
            helperText={errors.state?.message} 
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
            label={t('step1.country')} 
            fullWidth 
            {...register('country', { 
              required: 'Country is required',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'Country should contain only letters and spaces'
              }
            })} 
            error={!!errors.country} 
            helperText={errors.country?.message} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label={t('step1.phone')} 
            fullWidth 
            {...register('phone', { 
              required: 'Phone number is required',
              pattern: {
                value: /^[\+]?[1-9][\d]{0,15}$/,
                message: 'Please enter a valid phone number'
              },
              minLength: {
                value: 10,
                message: 'Phone number must be at least 10 digits'
              }
            })} 
            error={!!errors.phone} 
            helperText={errors.phone?.message} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label={t('step1.email')} 
            type="email" 
            fullWidth 
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              }
            })} 
            error={!!errors.email} 
            helperText={errors.email?.message} 
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button type="submit" variant="contained">{t('actions.continue')}</Button>
      </Box>
    </Box>
  );
}


