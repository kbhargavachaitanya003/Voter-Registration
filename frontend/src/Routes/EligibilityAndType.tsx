import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormGroup, RadioGroup, Typography, Radio, FormControlLabel, FormHelperText, Checkbox, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useStore from '../Store/Store'
import '../Styles/EligibilityAndType.css'

const EligibilityAndType = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        mode: 'onBlur'
    });
    const setEligibilityAndType = useStore(state => state.setEligibilityAndType);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);

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
            required: 'Please select any one of the options.'
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
                            <Typography variant='h5' className='type-header'>Eligibilities</Typography>

                            <FormControlLabel
                                control={<Checkbox {...register('isCitizen')} />}
                                className='eligibility-text'
                                label={<span>I am a citizen of the US<span className='required'>*</span>.</span>}
                            />
                            <FormControlLabel
                                control={<Checkbox {...register('isAge')} />}
                                className='eligibility-text'
                                label={<span>I am 18 years old or above by the date of election<span className='required'>*</span>.</span>}

                            />
                            <FormControlLabel
                                control={<Checkbox {...register('isResident')} className='eligibility-checkbox' />}
                                className='eligibility-text'
                                label={<span>I am a resident of the US<span className='required'>*</span>.</span>}
                            />
                            <FormControlLabel
                                control={<Checkbox {...register('isFelony')} />}
                                className='eligibility-text'
                                label={<span>I am not a convicted felon by the court of law<span className='required'>*</span>.</span>}
                            />
                            <Typography variant='h5' className='type-header'>Type of Registration</Typography>
                            <Typography variant="body1" gutterBottom className='type-subheader'>
                                Please select the type of registration you want to proceed with in this online voter registration process<span className='required'>*</span>:
                            </Typography>
                            <RadioGroup
                                className='type-radio'
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                value={checkType || ''}
                                onChange={(e) => setValue('typeOfRegistration', e.target.value)}
                            >
                                <FormControlLabel value='driving license' control={<Radio {...register('typeOfRegistration')} />} label="Registration through Driving License." className='type-text' />
                                <FormControlLabel value='ssn' control={<Radio {...register('typeOfRegistration')} />} label="Registration through Social Security Number(SSN)." className='type-text' />
                            </RadioGroup>
                            {errors.typeOfRegistration && (
                                <FormHelperText className='type-helper'>{String(errors.typeOfRegistration.message)}</FormHelperText>
                            )}
                            <Box mt={2} className='person-button-box'>
                                <Button onClick={handleBackRegistrationType}>Back</Button>
                                <Button variant='contained' color='primary' type='submit'>
                                    Next
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
                <DialogTitle id="alert-dialog-title">You are not eligible to vote</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant='body1' className='dialog-text'><b>Eligibility Criteria:</b></Typography>
                        <Typography variant='body1' className='dialog-text'>1.I am a citizen of the US</Typography>
                        <Typography variant='body1' className='dialog-text'>2.I am a resident of the US</Typography>
                        <Typography variant='body1' className='dialog-text'>3.I am 18 years old or above by the date of election</Typography>
                        <Typography variant='body1' className='dialog-text'>4.I am not a convicted felon by the court of law</Typography>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default EligibilityAndType
