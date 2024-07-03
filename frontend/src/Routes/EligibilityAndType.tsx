import React, { useEffect } from 'react'
import { Box, Button, FormControl, FormGroup, RadioGroup, Typography, Radio, FormControlLabel, FormHelperText, Checkbox } from '@mui/material'
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

    const checkType = watch('typeOfRegistration');
    const citizenship = watch('isCitizen');
    const age = watch('isAge');
    const residency = watch('isResident');
    const felony = watch('isFelony');

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
        register('isCitizen', {
            required: 'You must be a citizen of the US to register to vote.'
        });
        register('isAge', {
            required: 'You must be at least 18 years old to register to vote.'
        });
        register('isResident', {
            required: 'You must be a resident of the US to register to vote.'
        });
        register('isFelony', {
            required: 'You must not be a convicted felon by the court of law.'
        });
    }, [register]);

    const onSubmit = (data: any) => {
        if (!data.isCitizen || !data.isAge || !data.isResident || !data.isFelony) {
            console.log('Please check the eligibility criteria.');
            return;
        }
        console.log(data);
        setEligibilityAndType(data);
        handleNextRegistrationType();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='type-container'>
            <Box my={4} className='type-box'>
                <FormControl error={!!errors.typeOfRegistration} className='type-formcontrol'>
                    <FormGroup>
                        <Typography variant='h5' className='type-header'>Eligibilities</Typography>
                        <Box mt={2} className='eligibility-box'>
                            <FormControlLabel
                                control={<Checkbox {...register('isCitizen')} />}
                                className='eligibility-text'
                                label= {<span>I am a citizen of the US<span className='required'>*</span>.</span>}
                            />
                            {errors.isCitizen && (
                                <FormHelperText className='eligibility-helper'>{String(errors.isCitizen.message)}</FormHelperText>
                            )}
                        </Box>
                        <Box className='eligibility-box'>
                            <FormControlLabel
                                control={<Checkbox {...register('isAge')} />}
                                className='eligibility-text'
                                label={<span>I am 18 years old or above by the date of election<span className='required'>*</span>.</span>}

                            />
                            {errors.isAge && (
                                <FormHelperText className='eligibility-helper'>{String(errors.isAge.message)}</FormHelperText>
                            )}
                        </Box>
                        <Box className='eligibility-box'>
                            <FormControlLabel
                                control={<Checkbox {...register('isResident')} className='eligibility-checkbox'/>}
                                className='eligibility-text'
                                label={<span>I am a resident of the US<span className='required'>*</span>.</span>}
                            />
                            {errors.isResident && (
                                <FormHelperText className='eligibility-helper'>{String(errors.isResident.message)}</FormHelperText>
                            )}
                        </Box>
                        <Box className='eligibility-box'>
                            <FormControlLabel
                                control={<Checkbox {...register('isFelony')} />}
                                className='eligibility-text'
                                label={<span>I am not a convicted felon by the court of law<span className='required'>*</span>.</span>}
                            />
                            {errors.isFelony && (
                                <FormHelperText className='eligibility-helper'>{String(errors.isFelony.message)}</FormHelperText>
                            )}
                        </Box>
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
                            <FormControlLabel value='ssn' control={<Radio {...register('typeOfRegistration')}/>} label="Registration through Social Security Number(SSN)." className='type-text' />
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
    )
}

export default EligibilityAndType
