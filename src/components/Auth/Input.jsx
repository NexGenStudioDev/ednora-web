import React, {
   useEffect,
   useState,
   useMemo,
   useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInput, UpdateInput } from '../../store/AuthSlice';

const Input = ({ type, placeholder, label, id, name }) => {
   const [Name, setName] = useState(name);
   const [Value, setValue] = useState('');
   const [Login_Checkbox, setLogin_Checkbox] = useState(false);
   const [SignUp_Checkbox, setSignUp_Checkbox] = useState(false);

   const array = useSelector(state => state.auth?.data);
   const safeArray = array || [];

   const Find_Login_CheckBox = useMemo(
      () => safeArray.find(item => item.name === 'Login_CheckBox'),
      [safeArray],
   );

   const Find_SignUp_CheckBox = useMemo(
      () => safeArray.find(item => item.name === 'Sign_UP_CHECK'),
      [safeArray],
   );

   useEffect(() => {
      if (Find_Login_CheckBox) {
         setLogin_Checkbox(Find_Login_CheckBox.value);
      }
      if (Find_SignUp_CheckBox) {
         setSignUp_Checkbox(Find_SignUp_CheckBox.value);
      }
   }, [Find_Login_CheckBox, Find_SignUp_CheckBox]);

   const find_index = useMemo(
      () => safeArray.findIndex(item => item.name === Name),
      [safeArray, Name],
   );

   const dispatch = useDispatch();

   const handleInput = useCallback(
      e => {
         const val = e.target.value;
         setValue(val);

         const data = {
            name: Name,
            value: val,
         };

         if (find_index !== -1) {
            dispatch(UpdateInput(data));
         } else {
            dispatch(setInput(data));
         }
      },
      [Name, find_index, dispatch],
   );

   if (!array) {
      return null;
   }

   let Handle_Unchacked = () => {
      if (Login_Checkbox === true) {
         return 'text';
      }

      if (SignUp_Checkbox === true) {
         return 'text';
      }

      return 'password';
   };

   return (
      <div className='mb-4'>
         {label && (
            <label
               htmlFor={id}
               className='block text-[1vw] my-2 text-[#5F5F5F] max-[999px]:text-[3vw]'
            >
               {label}
            </label>
         )}
         <input
            type={type !== 'password' ? 'text' : Handle_Unchacked()}
            value={Value ?? ''}
            autoComplete='off'
            id={id}
            name={name}
            onInput={e => handleInput(e)}
            placeholder={placeholder}
            className='border-[0.83px] border-[#A0A0A080]/50 placeholder:text-[#333] rounded-lg p-3 w-full text-[0.8vw] max-[999px]:text-[2.5vw]'
         />
      </div>
   );
};

export default Input;
