import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import YourInfo from './YourInfo';
import ParentsInfo from './ParentsInfo';
import AreyouHuman from './AreyouHuman';
import Grades from './Grades';
import UniversityInfo from './UniversityInfo';
import StepValidateModal from './StepValidateModal';
import { setFile } from '../../../store/AdmissionSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import admissionConstant from './admission.constant.mjs';

const Steps = () => {
   const [activeStep, setActiveStep] = useState(0);
   const [isLoading, setIsLoading] = useState(false);
   const [image, setImage] = useState(null);
   const [imageUploadSuccess, setImageUploadSuccess] =
      useState(false);

   const [Avtor, setAvtor] = useState(null);
   const [missingFields, setMissingFields] = useState([]);
   const [showErrors, setShowErrors] = useState(false);

   const [formData, setFormData] = useState({
      firstName: '',
      middleName: '',
      lastName: '',
      fatherName: '',
      motherName: '',
      AadharCardNumber: '',
      email: '',
      contactNumber: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      street: '',
      city: '',
      state: '',
      pinCode: '',
   });
   useEffect(() => {
      const savedData = sessionStorage.getItem('admissionFormData');
      if (savedData) {
         setFormData(JSON.parse(savedData));
      }
   }, []);

   let admission = useSelector(state => state.admission.admission);

   let dispatch = useDispatch();

   const handleInputChange = e => {
      const { name, value } = e.target;
      setFormData(prevData => ({
         ...prevData,
         [name]: value,
      }));

      setMissingFields(prev =>
         prev.filter(
            err => !err.toLowerCase().includes(name.toLowerCase()),
         ),
      );
   };

   const handleDropdownChange = (name, value) => {
      setFormData(prevData => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleImageUpload = e => {
      const file = e.target.files[0];
      setAvtor(file);

      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setImage(reader.result);
            setImageUploadSuccess(true);

            dispatch(setFile([URL.createObjectURL(file)]));
         };
         reader.readAsDataURL(file);
      }
   };

   const Handle_From_Submit = async () => {
      setIsLoading(true);

      try {
         const formData = new FormData();

         admission.forEach(element => {
            formData.append(element.name, element.value);
         });

         if (Avtor) {
            formData.append('avtar', Avtor);
         }

         let res = await axios.post(
            '/api/v1/online/admission',
            formData,
            {
               headers: {
                  'Content-Type': admissionConstant.CONTENT_TYPE,
               },
            },
         );

         Swal.fire({
            icon: 'success',
            title: admissionConstant.SUCCESS_TITLE,
            text: res.data.message || admissionConstant.SUCCESS_TEXT,
            showConfirmButton: false,
            timer: 1500,
         });
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Error',
            text:
               error.response.data.message || admissionConstant.ERROR,
            showConfirmButton: true,
            timer: 2500,
         });
      } finally {
         setIsLoading(false);
      }
   };

   const steps = [
      {
         label: 'Your Info',
         component: (
            <YourInfo
               handleInputChange={handleInputChange}
               handleDropdownChange={handleDropdownChange}
               errors={missingFields}
               showErrors={showErrors}
            />
         ),
      },
      {
         label: 'Parents Info',
         component: (
            <ParentsInfo
               handleInputChange={handleInputChange}
               handleDropdownChange={handleDropdownChange}
            />
         ),
      },
      {
         label: 'Are you Human?',
         component: <AreyouHuman />,
      },
      {
         label: 'Grades',
         component: <Grades />,
      },
      {
         label: 'University Info',
         component: <UniversityInfo />,
      },
   ];

   const validateStep = () => {
      const stepValidationConfig = {
         0: [
            'firstName',
            'lastName',
            'email',
            'fatherName',
            'motherName',
            'AadharCardNumber',
            'contactNumber',
            'dateOfBirth',
            'gender',
            'nationality',
            'street',
            'city',
            'state',
            'pinCode',
         ],
         1: ['Gname', 'Grelation', 'GcontactNumber'],
         2: [], // AreYouHuman step
         3: [
            'tenthBoard',
            'tenthGrade',
            'twelfthMarks',
            'twelfthGrade',
         ],
         4: ['university', 'courseName', 'mode'],
      };

      const missing = [];
      const requiredFields = stepValidationConfig[activeStep] || [];

      for (const field of requiredFields) {
         const value = formData[field];
         if (
            value === undefined ||
            value === null ||
            (typeof value === 'string' && value.trim() === '')
         ) {
            const formatted = field
               .replace(/([A-Z])/g, ' $1')
               .replace(/^./, str => str.toUpperCase());
            missing.push(formatted);
         }
      }

      if (activeStep === 4 && !image) {
         missing.push('Profile Picture');
      }

      sessionStorage.setItem(
         'admissionFormData',
         JSON.stringify(formData),
      );

      setMissingFields(missing);
      return missing.length === 0;
   };

   const handleNext = e => {
      e.preventDefault(); // Prevent accidental page reload
      setShowErrors(true);
      if (validateStep()) {
         if (activeStep < steps.length - 1) {
            setActiveStep(prevStep => prevStep + 1);
            setShowErrors(false);
         }
      } else {
         //  setIsModalOpen(true);

         const firstErrorField =
            document.querySelector('.input-error');
         firstErrorField?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
         });
      }
   };

   const handlePrevious = () => {
      if (activeStep > 0) {
         setActiveStep(prevStep => prevStep - 1);
      }
   };

   return (
      <>
         <form action='POST'>
            <div className='flex mt-10 mb-20 items-center w-full'>
               {steps.map((step, index) => (
                  <React.Fragment key={index}>
                     <div className='w-[18vw]'>
                        <div
                           className={`mt-2 text-[1.31vw] leading-none text-center font-medium
                    ${index <= activeStep ? 'text-black' : 'text-[#AAAAAA]'}`}
                        >
                           {step.label}
                        </div>
                        <div className='flex items-center'>
                           <div
                              className={`min-[800px]:w-6 w-3 h-3 min-[800px]:h-6 flex items-center bg-white justify-center rounded-full border-2 transition-all duration-300 ease-in-out
                    ${index <= activeStep ? 'border-black' : 'border-[#A0A0A080]'}`}
                           >
                              <div
                                 className={`min-[800px]:w-3.5 w-1.5 h-1.5 min-[800px]:h-3.5 rounded-full
                      ${index <= activeStep ? 'bg-black' : 'bg-[#A0A0A080]'}`}
                              ></div>
                           </div>
                           {index < steps.length - 0 && (
                              <div
                                 className={`flex-grow h-0.5 mx-2 transition-all duration-300 ease-in-out
                      ${index < activeStep ? 'bg-black' : 'bg-[#333333]/30'}`}
                              ></div>
                           )}
                        </div>
                     </div>
                  </React.Fragment>
               ))}
            </div>

            {steps[activeStep].component}

            <div className='rounded-[8px] flex flex-wrap gap-4 items-end justify-between mt-16 min-[800px]:w-[47%] border border-[#AAAAAA80] px-5 pt-4 pb-5'>
               <div className='min-[700px]:w-[70%]'>
                  <h1 className='text-[#576675]'>Picture Upload</h1>
                  <p className='text-xs text-[#A1A8B4] pt-2'>
                     Submit Your Order Information - Item Name,
                     Decoration Size, Quantity, Due Date, and any
                     other details
                  </p>
               </div>

               <input
                  type='file'
                  accept='.jpg, .jpeg, .png , .webp'
                  onChange={handleImageUpload}
                  className='hidden'
                  id='upload-btn'
               />
               <label
                  htmlFor='upload-btn'
                  className='cursor-pointer text-center bg-[#333333] px-6 text-white py-2.5 text-xs rounded-[8px]'
               >
                  Upload
               </label>

               {imageUploadSuccess && image && (
                  <div className='mt-4'>
                     <p className='text-green-500'>
                        Upload successful!
                     </p>
                     <img
                        src={image}
                        alt='Uploaded'
                        className='mt-2 w-32 h-32 object-cover rounded-md'
                     />
                  </div>
               )}
            </div>

            <div className='flex mt-10 min-[1000px]:mt-0 min-[600px]:flex-row flex-col w-full items-center justify-end gap-5'>
               {activeStep > 0 && (
                  <button
                     type='button'
                     className='text-center bg-[#333333] w-full min-[600px]:w-fit px-6 text-white py-2.5 text-sm rounded-[8px]'
                     onClick={handlePrevious}
                     disabled={isLoading}
                  >
                     Previous
                  </button>
               )}

               <button
                  type='button'
                  className='text-center w-full min-[600px]:w-fit bg-[#333333] px-6 text-white py-2.5 text-sm rounded-[8px]'
                  onClick={
                     steps.length - 1 === activeStep
                        ? Handle_From_Submit
                        : handleNext
                  }
                  disabled={isLoading}
               >
                  {isLoading ? (
                     <div className='flex items-center justify-center'>
                        <span
                           className='spinner-border spinner-border-sm text-white mr-2'
                           role='status'
                           aria-hidden='true'
                        ></span>
                        <span>Submitting...</span>
                     </div>
                  ) : activeStep === steps.length - 1 ? (
                     'Submit'
                  ) : (
                     'Next'
                  )}
               </button>
            </div>

            {isLoading && (
               <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                  <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white'></div>
               </div>
            )}
         </form>
         {/* <StepValidateModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title='Incomplete Form'
            message='Please fill in all fields before proceeding!'
            missingFields={missingFields}
         /> */}
      </>
   );
};

export default Steps;
