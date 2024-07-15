import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormGroup, RadioGroup, Typography, Radio, FormControlLabel, FormHelperText, Checkbox, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useStore from '../Store/Store'
import { useTranslation } from 'react-i18next'
import '../Styles/EligibilityAndType.css'

const EligibilityAndType = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        mode: 'onBlur'
    });
    const setEligibilityAndType = useStore(state => state.setEligibilityAndType);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const { t } = useTranslation();

    const checkType = watch('typeOfRegistration');
    watch('isCitizen');
    watch('isAge');
    watch('isResident');
    watch('isFelony');

    const handleBackRegistrationType = () => {
        navigate('/');
    }
    const handleNextRegistrationType = () => {
        navigate('/step/0');
    }

    useEffect(() => {
        register('typeOfRegistration', {
            required: {
                value: true,
                message: t('registrationTypeRequiredMessage')
            }
        });
        register('isCitizen');
        register('isAge');
        register('isResident');
        register('isFelony');
    }, [register]);

    const onSubmit = (data: any) => {
        if (!data.isCitizen || !data.isAge || !data.isResident || !data.isFelony) {
            console.log('Please check the eligibility criteria.');
            setOpenDialog(true);
            console.log(data);
            return;
        }
        console.log(data);
        setEligibilityAndType(data);
        handleNextRegistrationType();
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='type-container'>
                <Box my={4} className='type-box'>
                    <FormControl error={!!errors.typeOfRegistration} className='type-formcontrol'>
                        <FormGroup>
                            <Typography variant='h5' className='type-header'>{t('eligibilitiesHeader')}</Typography>

                            <FormControlLabel
                                control={<Checkbox {...register('isCitizen')} />}
                                className='eligibility-text'
                                label={<span>{t('eligibility1')}<span className='required'>*</span>.</span>}
                            />
                            <FormControlLabel
                                control={<Checkbox {...register('isAge')} />}
                                className='eligibility-text'
                                label={<span>{t('eligibility2')}<span className='required'>*</span>.</span>}

                            />
                            <FormControlLabel
                                control={<Checkbox {...register('isResident')} className='eligibility-checkbox' />}
                                className='eligibility-text'
                                label={<span>{t('eligibility3')}<span className='required'>*</span>.</span>}
                            />
                            <FormControlLabel
                                control={<Checkbox {...register('isFelony')} />}
                                className='eligibility-text'
                                label={<span>{t('eligibility4')}<span className='required'>*</span>.</span>}
                            />
                            <Typography variant='h5' className='type-header'>{t('registrationTypeHeader')}</Typography>
                            <Typography variant="body1" gutterBottom className='type-subheader'>
                                {t('registrationTypeText')}<span className='required'>*</span>:
                            </Typography>
                            <RadioGroup
                                className='type-radio'
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                value={checkType || ''}
                                onChange={(e) => setValue('typeOfRegistration', e.target.value)}
                            >
                                <FormControlLabel value='driving license' control={<Radio {...register('typeOfRegistration')} />} label={t('registrationType1')} className='type-text' />
                                <FormControlLabel value='ssn' control={<Radio {...register('typeOfRegistration')} />} label={t('registrationType2')} className='type-text' />
                            </RadioGroup>
                            {errors.typeOfRegistration && (
                                <FormHelperText className='type-helper'>{String(errors.typeOfRegistration.message)}</FormHelperText>
                            )}
                            <Box mt={2} className='person-button-box'>
                                <Button onClick={handleBackRegistrationType}>{t('backButton')}</Button>
                                <Button variant='contained' color='primary' type='submit'>
                                    {t('nextButton')}
                                </Button>
                            </Box>
                        </FormGroup>
                    </FormControl>
                </Box>
            </form>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{t('eligibilityDialogHeading')}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant='body1' className='dialog-text'><b>{t('eligibilityDialogText')}</b></Typography>
                        <Typography variant='body1' className='dialog-text'>1.{t('eligibility1')}</Typography>
                        <Typography variant='body1' className='dialog-text'>2.{t('eligibility2')}</Typography>
                        <Typography variant='body1' className='dialog-text'>3.{t('eligibility3')}</Typography>
                        <Typography variant='body1' className='dialog-text'>4.{t('eligibility4')}</Typography>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        {t('okButton')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default EligibilityAndType
