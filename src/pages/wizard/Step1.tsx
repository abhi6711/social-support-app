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

export default function Step1({ onNext }: { onNext: () => void }) {
  const { data, update } = useFormData();
  const { register, handleSubmit, formState: { errors } } = useForm<Step1Values>({
    defaultValues: data.personal,
  });

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
          <TextField label={t('step1.name')} fullWidth {...register('name', { required: 'Required' })} error={!!errors.name} helperText={errors.name?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label={t('step1.nationalId')} fullWidth {...register('nationalId', { required: 'Required' })} error={!!errors.nationalId} helperText={errors.nationalId?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField type="date" label={t('step1.dob')} InputLabelProps={{ shrink: true }} fullWidth {...register('dateOfBirth', { required: 'Required' })} error={!!errors.dateOfBirth} helperText={errors.dateOfBirth?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label={t('step1.gender')} fullWidth {...register('gender', { required: 'Required' })} error={!!errors.gender} helperText={errors.gender?.message} />
        </Grid>
        <Grid item xs={12}>
          <TextField label={t('step1.address')} fullWidth {...register('address', { required: 'Required' })} error={!!errors.address} helperText={errors.address?.message} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label={t('step1.city')} fullWidth {...register('city', { required: 'Required' })} error={!!errors.city} helperText={errors.city?.message} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label={t('step1.state')} fullWidth {...register('state', { required: 'Required' })} error={!!errors.state} helperText={errors.state?.message} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label={t('step1.country')} fullWidth {...register('country', { required: 'Required' })} error={!!errors.country} helperText={errors.country?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label={t('step1.phone')} fullWidth {...register('phone', { required: 'Required' })} error={!!errors.phone} helperText={errors.phone?.message} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label={t('step1.email')} type="email" fullWidth {...register('email', { required: 'Required' })} error={!!errors.email} helperText={errors.email?.message} />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button type="submit" variant="contained">{t('actions.continue')}</Button>
      </Box>
    </Box>
  );
}


