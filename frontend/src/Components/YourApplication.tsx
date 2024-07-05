import { Container, Typography, List, ListItem, ListItemText, Box, Checkbox, FormGroup, FormControlLabel } from '@mui/material'
import React, { forwardRef } from 'react'

import '../Styles/YourApplication.css'
import useStore from '../Store/Store'

const YourApplication = forwardRef<HTMLDivElement>((props, ref) => {
  const personalDetails = useStore(state => state.personalDetails);
  const address = useStore(state => state.address);
  const otherDetails = useStore(state => state.otherDetails);
  return (
    <Container className='application-container' ref={ref}>
      <Typography variant='h4' className='application-header'>Voter Registration Application</Typography>
      <Typography variant='h5' className='application-sub-header'>To Register for Vote you must:</Typography>

      <List className='application-list'>
        <ListItem className='application-listitem'>
          <ListItemText primary="1. You must be a citizen of United States of America." />
          <ListItemText primary="2. You must be a resident of the state you are registering in." />
          <ListItemText primary="3. You must be at least 17 years old(you must turn 18 years old by the date of election)." />
          <ListItemText primary="4. You must not be a convicted felon or declared mentally incompetent by a court of law." />
          <ListItemText primary="5. You must not claim the right to vote in any other state." />
        </ListItem>
      </List>
      <Box className='application-box-line'>
        <Typography variant='h5' className='application-count'><b>(1a)</b></Typography>
        <Typography variant='body2' className='application-details-header'><b>select the voter type:</b></Typography>
        <FormGroup className='application-formgroup'>
          <FormControlLabel control={<Checkbox checked={personalDetails?.voterType === "New Voter Registration"} />} label="New Voter Registration" />
          <FormControlLabel control={<Checkbox checked={personalDetails?.voterType === "Change Voter Registration"} />} label="Change Voter Registration" />
        </FormGroup>
      </Box>
      <Box className='application-box-line'>
        <Typography variant='h5' className='application-count'><b>(1b)</b></Typography>
        <Box className='box'>
          <Box className='application-box'>
            <Typography variant='body2' className='application-details-header'><b>Are you citizen of US:</b></Typography>
            <FormGroup className='application-formgroup'>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Yes" />
              <FormControlLabel control={<Checkbox />} label="No" />
            </FormGroup>
          </Box>
          <Box className='application-box'>
            <Typography variant='body2' className='application-details-header'><b>Are you Resident of US:</b></Typography>
            <FormGroup className='application-formgroup'>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Yes" />
              <FormControlLabel control={<Checkbox />} label="No" />
            </FormGroup>
          </Box>
          <Box className='application-box'>
            <Typography variant='body2' className='application-details-header'><b>Are you 18 years old on or before election:</b></Typography>
            <FormGroup className='application-formgroup'>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Yes" />
              <FormControlLabel control={<Checkbox />} label="No" />
            </FormGroup>
          </Box>
        </Box>
      </Box>
      <Box className='application-box-line'>
        <Typography variant='h5' className='application-count'><b>(2)</b></Typography>
        <Box className='box'>
          <Box className='application-box'>
            <Typography variant='body2' className='application-details-header'><b>Prefix:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{personalDetails?.prefix}</Typography>
            <Typography variant='body2' className='application-details-header-name'><b>First Name:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{personalDetails?.firstName}</Typography>
            <Typography variant='body2' className='application-details-header-name'><b>Middle Name:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{personalDetails?.middleName}</Typography>
          </Box>
          <Box className='application-box-gap'>
            <Typography variant='body2' className='application-details-header'><b>Last Name:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{personalDetails?.lastName}</Typography>
            <Typography variant='body2' className='application-details-header-name'><b>Suffix:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{personalDetails?.suffix}</Typography>
          </Box>
        </Box>
      </Box>
      <Box className='application-box-line'>
        <Typography variant='h5' className='application-count'><b>(3)</b></Typography>
        <Typography variant='body2' className='application-details-header'><b>Date Of Birth:</b></Typography>
        <Typography variant='body2' className='application-details-text'>{personalDetails?.dob}</Typography>
        <Typography variant='h5' className='application-count-gap'><b>(4)</b></Typography>
        <Typography variant='body2' className='application-details-header'><b>SSN:</b></Typography>
        <Typography variant='body2' className='application-details-text'>{personalDetails?.ssn}</Typography>
      </Box>
      <Box className='application-box-line'>
        <Typography variant='h5' className='application-count'><b>(5)</b></Typography>
        <Box className='box'>
          <Typography variant='body1' className='application-details-header'><b>Residence Address:-</b></Typography>
          <Box className='application-box-gap'>
            <Typography variant='body2' className='application-details-header'><b>Street Number:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{address?.streetNumber}</Typography>
            <Typography variant='body2' className='application-details-header-name1'><b>Street Name:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{address?.streetName}</Typography>
            <Typography variant='body2' className='application-details-header-name1'><b>Apartment?Unit:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{address?.apartUnit}</Typography>

          </Box>
          <Box className='application-box-gap'>
            <Typography variant='body2' className='application-details-header'><b>City/Town:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{address?.city}</Typography>
            <Typography variant='body2' className='application-details-header-name'><b>State:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{address?.state}</Typography>
            <Typography variant='body2' className='application-details-header-name'><b>Zip-Code:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{address?.zip}</Typography>
          </Box>
        </Box>

      </Box>
      <Box className='application-box-line'>
        <Typography variant='h5' className='application-count'><b>(6)</b></Typography>
        <Box className='box'>
          <Typography variant='body1' className='application-details-header'><b>Mailing Address:-</b></Typography>
          <Box className='application-box-gap'>
            <Typography variant='body2' className='application-details-header'><b>Street Number:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{address?.mStreetNumber}</Typography>
            <Typography variant='body2' className='application-details-header-name1'><b>Street Name:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{address?.mStreetName}</Typography>
            <Typography variant='body2' className='application-details-header-name1'><b>Apartment?Unit:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{address?.mApartUnit}</Typography>

          </Box>
          <Box className='application-box-gap'>
            <Typography variant='body2' className='application-details-header'><b>City/Town:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{address?.mTown}</Typography>
            <Typography variant='body2' className='application-details-header-name'><b>State:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{address?.mState}</Typography>
            <Typography variant='body2' className='application-details-header-name'><b>Zip-Code:</b></Typography>
            <Typography variant='body2' className='application-details-text'>{address?.mZip}</Typography>
          </Box>
        </Box>

      </Box>
      <Box className='application-box-line'>
        <Typography variant='h5' className='application-count'><b>(7)</b></Typography>
        <Typography variant='body2' className='application-details-header'><b>Mobile Number:</b></Typography>
        <Typography variant='body2' className='application-details-text'>{otherDetails?.mobile}</Typography>
        <Typography variant='h5' className='application-count'><b>(8)</b></Typography>
        <Typography variant='body2' className='application-details-header'><b>Gender:</b></Typography>
        <FormGroup className='application-formgroup'>
          <FormControlLabel control={<Checkbox checked={otherDetails?.gender === "male"} />} label="Male" />
          <FormControlLabel control={<Checkbox checked={otherDetails?.gender === "female"} />} label="Female" />
          <FormControlLabel control={<Checkbox checked={otherDetails?.gender === "other"} />} label="Other" />
        </FormGroup>

      </Box>
      <Box className='application-box-line'>
        <Typography variant='h5' className='application-count'><b>(9)</b></Typography>
        <Box className='box'>
          <Typography variant='body1' className='application-details-header'><b>Do you want to join any political party? If yes, please fill the party name below.:-</b></Typography>
          <FormGroup className='application-formgroup'>
            <Box className='box'>
              <Box className='application-box'>
                <FormControlLabel control={<Checkbox checked={otherDetails?.partyEnroll === "yes"} />} label="Yes" />
                <Typography variant='body2' className='application-details-header'><b>Party Name:</b></Typography>
                <FormControlLabel control={<Checkbox checked={otherDetails?.partyName === "Republican" && otherDetails?.partyEnroll === "yes"} />} label="Republican" />
                <FormControlLabel control={<Checkbox checked={otherDetails?.partyName === "Democratic" && otherDetails?.partyEnroll === "yes"} />} label="Democratic" />
                <Typography variant='body2' className='application-details-header'>Other:</Typography>
                <Typography variant='body2' className='application-details-text'>{(otherDetails?.partyEnroll === "yes" && otherDetails?.partyName !== "Republican" && otherDetails?.partyName !== "Democratic") ? otherDetails?.partyName : ''}</Typography>
              </Box>
              <Box className='application-box'>
                <FormControlLabel control={<Checkbox checked={otherDetails?.partyEnroll === "no"} />} label="No" className='party-no-display' />
              </Box>
            </Box>
          </FormGroup>
        </Box>
      </Box>
      <Box className='application-box-last'>
        <Typography variant='h5' className='application-count'><b>(10)</b></Typography>
        <Typography variant='body2' className='application-details-header'><b>Signature:</b></Typography>
        <Typography variant='body2' className='application-details-text'></Typography>

      </Box>
    </Container>
  )
})

export default YourApplication
